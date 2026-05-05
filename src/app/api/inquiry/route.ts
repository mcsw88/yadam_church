import { NextResponse } from "next/server";
import { Resend } from "resend";

interface InquiryRequestBody {
  message?: string;
}

type FallbackReason =
  | "daily_quota"
  | "monthly_quota"
  | "rate_limit"
  | "send_failed";

type ResendSendError = {
  name?: string;
  message?: string;
  statusCode?: number;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function resolveResendFallback(error: unknown): {
  reason: FallbackReason;
  message: string;
  status: number;
} {
  const resendError = error as ResendSendError;
  const name = resendError?.name ?? "";
  const message = resendError?.message ?? "";
  const statusCode = resendError?.statusCode ?? 503;

  const normalizedName = name.toLowerCase();
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedName.includes("daily_quota") ||
    normalizedName.includes("daily_quota_exceeded") ||
    normalizedMessage.includes("daily email quota") ||
    normalizedMessage.includes("daily quota")
  ) {
    return {
      reason: "daily_quota",
      message:
        "오늘 자동 전송 한도에 도달했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
      status: 429,
    };
  }

  if (
    normalizedName.includes("monthly_quota") ||
    normalizedName.includes("monthly_quota_exceeded") ||
    normalizedMessage.includes("monthly email quota") ||
    normalizedMessage.includes("monthly quota")
  ) {
    return {
      reason: "monthly_quota",
      message:
        "이번 달 자동 전송 한도에 도달했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
      status: 429,
    };
  }

  if (statusCode === 429) {
    return {
      reason: "rate_limit",
      message:
        "자동 전송 요청이 잠시 제한되었습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
      status: 429,
    };
  }

  return {
    reason: "send_failed",
    message:
      "자동 메일 전송에 실패했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
    status: 503,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          fallback: false,
          message: "문의 내용을 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    if (message.length > 4000) {
      return NextResponse.json(
        {
          ok: false,
          fallback: false,
          message: "문의 내용은 4000자 이하로 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          fallback: true,
          fallbackReason: "send_failed",
          message: "메일 발송 설정이 완료되지 않았습니다.",
        },
        { status: 503 },
      );
    }
    // 여기부터 강제 fallback 테스트 코드
    const FORCE_FALLBACK:
      | "daily_quota"
      | "monthly_quota"
      | "rate_limit"
      | "send_failed"
      | null = null; //"daily_quota";

    if (FORCE_FALLBACK) {
      const forcedMessages = {
        daily_quota:
          "오늘 자동 전송 한도에 도달했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
        monthly_quota:
          "이번 달 자동 전송 한도에 도달했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
        rate_limit:
          "자동 전송 요청이 잠시 제한되었습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
        send_failed:
          "자동 메일 전송에 실패했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
      } as const;

      const forcedStatus = {
        daily_quota: 429,
        monthly_quota: 429,
        rate_limit: 429,
        send_failed: 503,
      } as const;

      return NextResponse.json(
        {
          ok: false,
          fallback: true,
          fallbackReason: FORCE_FALLBACK,
          message: forcedMessages[FORCE_FALLBACK],
        },
        {
          status: forcedStatus[FORCE_FALLBACK],
        },
      );
    }
    // 여기까지 강제 fallback 테스트 코드
    const resend = new Resend(apiKey);

    const subject = "[안양예담교회] 홈페이지 문의";
    const text = [
      "안양예담교회 홈페이지 문의가 도착했습니다.",
      "",
      "문의 내용:",
      message,
      "",
      "발송 위치: 홈페이지 문의하기 패널",
    ].join("\n");

    const escapedMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
        <h2 style="margin: 0 0 16px;">안양예담교회 홈페이지 문의</h2>
        <p style="margin: 0 0 16px;">홈페이지 문의하기 패널에서 문의가 도착했습니다.</p>
        <div style="padding: 16px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">
          ${escapedMessage}
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend inquiry send failed:", error);

      const fallback = resolveResendFallback(error);

      return NextResponse.json(
        {
          ok: false,
          fallback: true,
          fallbackReason: fallback.reason,
          message: fallback.message,
        },
        { status: fallback.status },
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Inquiry email send failed:", error);

    const fallback = resolveResendFallback(error);

    return NextResponse.json(
      {
        ok: false,
        fallback: true,
        fallbackReason: fallback.reason,
        message: fallback.message,
      },
      { status: fallback.status },
    );
  }
}
