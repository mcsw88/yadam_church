"use client";

import { useMemo, useRef, useState } from "react";

import { SlideOver } from "@/components/interaction/SlideOver";
import { CHURCH_INFO } from "@/data/church-info";

interface ContactOverlayTriggerProps {
  variant?: "header" | "footer" | "footerText";
}

type SendStatus =
  | "idle"
  | "sending"
  | "success"
  | "error"
  | "fallback"
  | "dailyQuota"
  | "monthlyQuota";

export function ContactOverlayTrigger({
  variant = "header",
}: ContactOverlayTriggerProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyToastMessage, setCopyToastMessage] = useState("");
  const copyToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string, duration = 3000) => {
    setCopyToastMessage(message);

    if (copyToastTimerRef.current) {
      clearTimeout(copyToastTimerRef.current);
    }

    copyToastTimerRef.current = setTimeout(() => {
      setCopyToastMessage("");
      copyToastTimerRef.current = null;
    }, duration);
  };

  const email = CHURCH_INFO.email;
  const phoneHref = `tel:${CHURCH_INFO.phone.replace(/[^0-9+]/g, "")}`;

  const buttonClass =
    variant === "footer"
      ? "inline-flex items-center justify-center rounded-full border border-dado-light/20 px-5 py-2.5 font-sans text-xs tracking-[0.18em] text-dado-light/85 transition hover:border-dado-light/45 hover:text-dado-light"
      : variant === "footerText"
        ? "font-sans text-sm uppercase tracking-[0.3em] text-dado-accent transition-colors hover:text-dado-light"
        : "hidden items-center justify-center rounded-full border border-current/25 px-4 py-2 font-sans text-xs tracking-[0.18em] transition hover:border-current/50 md:inline-flex";

  const mailSubject = "[안양예담교회] 홈페이지 문의";

  const mailBody = useMemo(() => {
    const trimmed = message.trim();

    return [
      "안녕하세요. 안양예담교회 홈페이지를 통해 문의드립니다.",
      "",
      "문의 내용:",
      trimmed || "(문의 내용을 입력해 주세요.)",
      "",
      "보낸 위치: 안양예담교회 홈페이지 문의하기 패널",
    ].join("\n");
  }, [message]);

  const mailtoHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(
        mailSubject,
      )}&body=${encodeURIComponent(mailBody)}`
    : undefined;

  const handleSend = async () => {
    const trimmed = message.trim();

    setCopied(false);

    if (!trimmed) {
      setStatus("error");
      setStatusMessage("문의 내용을 입력해 주세요.");
      return;
    }

    try {
      setStatus("sending");
      setStatusMessage("");

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        fallback?: boolean;
        fallbackReason?:
          | "daily_quota"
          | "monthly_quota"
          | "rate_limit"
          | "send_failed";
        message?: string;
      };

      if (response.ok && result.ok) {
        setStatus("success");
        setStatusMessage("");
        showToast("문의가 전송되었습니다.", 3000);
        return;
      }

      if (result.fallback) {
        if (result.fallbackReason === "daily_quota") {
          setStatus("dailyQuota");
        } else if (result.fallbackReason === "monthly_quota") {
          setStatus("monthlyQuota");
        } else {
          setStatus("fallback");
        }

        setStatusMessage("");

        showToast(
          result.message ??
            "자동 전송에 실패했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
        );

        return;
      }

      setStatus("error");
      setStatusMessage(result.message ?? "문의 전송에 실패했습니다.");
    } catch {
      setStatus("fallback");
      setStatusMessage("");
      showToast(
        "자동 전송에 실패했습니다. 위의 내용 복사 버튼을 사용하거나 메일 앱으로 직접 보내 주세요.",
      );
    }
  };

  const handleCopy = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setCopied(false);
      setStatus("error");
      setStatusMessage("복사할 문의 내용을 입력해 주세요.");
      return;
    }

    try {
      await navigator.clipboard.writeText(trimmedMessage);
      setCopied(true);

      showToast(
        "문의 내용이 복사되었습니다. 필요하면 메일 앱으로 직접 보내 주세요.",
        3000,
      );
    } catch {
      setCopied(false);
      setStatus("error");
      setStatusMessage(
        "복사에 실패했습니다. 직접 내용을 선택해 복사해 주세요.",
      );
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setMessage("");
    setCopied(false);
    setStatus("idle");
    setStatusMessage("");
    setCopyToastMessage("");

    if (copyToastTimerRef.current) {
      clearTimeout(copyToastTimerRef.current);
      copyToastTimerRef.current = null;
    }
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className={buttonClass}>
        문의하기
      </button>

      <SlideOver
        open={open}
        onClose={() => setOpen(false)}
        title="문의하기"
        side="right"
      >
        <div className="allow-text-select mx-auto max-w-[34rem] space-y-10">
          <div className="space-y-5">
            <p className="font-sans text-xs uppercase tracking-[0.32em] text-dado-accent">
              Contact
            </p>

            <h2 className="font-serif text-4xl italic leading-tight text-[var(--color-dado-dark)] md:text-5xl">
              문의하기
            </h2>

            <p className="font-sans text-base leading-8 text-[color-mix(in_srgb,var(--color-dado-dark)_78%,transparent)] md:text-lg">
              예배, 방문, 교회 소개, 상담 문의를 남겨 주세요. 자동 전송이
              실패하면 작성한 내용을 복사하거나 메일 앱으로 보낼 수 있습니다.
            </p>
          </div>

          <div className="space-y-8 border-t border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] pt-8">
            <section className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-dado-accent">
                Phone
              </p>
              <a
                href={phoneHref}
                className="block font-serif text-2xl text-[var(--color-dado-dark)] transition hover:text-dado-accent"
              >
                {CHURCH_INFO.phone}
              </a>
            </section>

            {email ? (
              <section className="space-y-3">
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-dado-accent">
                  Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="block font-sans text-base leading-relaxed text-[color-mix(in_srgb,var(--color-dado-dark)_82%,transparent)] transition hover:text-dado-accent md:text-lg"
                >
                  {email}
                </a>
              </section>
            ) : null}

            <section className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-dado-accent">
                Address
              </p>
              <p className="font-sans text-base leading-relaxed text-[color-mix(in_srgb,var(--color-dado-dark)_82%,transparent)] md:text-lg">
                {CHURCH_INFO.address}
              </p>
            </section>

            <section className="space-y-4">
              <label
                htmlFor="contact-message"
                className="block font-sans text-xs uppercase tracking-[0.24em] text-dado-accent"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (status !== "sending") {
                    setStatus("idle");
                    setStatusMessage("");
                    setCopied(false);
                  }
                }}
                rows={8}
                placeholder="문의 내용을 입력해 주세요."
                className="min-h-[12rem] w-full resize-none rounded-[1.25rem] border border-[color-mix(in_srgb,var(--color-dado-dark)_16%,transparent)] bg-white/72 px-5 py-4 font-sans text-base leading-7 text-[var(--color-dado-dark)] outline-none transition placeholder:text-[color-mix(in_srgb,var(--color-dado-dark)_35%,transparent)] focus:border-[color-mix(in_srgb,var(--color-dado-dark)_42%,transparent)] focus:bg-white"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!message.trim()}
                  className="font-sans text-sm tracking-wide text-[color-mix(in_srgb,var(--color-dado-dark)_62%,transparent)] transition hover:text-[var(--color-dado-dark)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? "복사되었습니다" : "내용 복사"}
                </button>
              </div>
            </section>

            {statusMessage ? (
              <p
                className={`font-sans text-sm leading-relaxed ${
                  status === "success"
                    ? "text-dado-accent"
                    : "text-[color-mix(in_srgb,var(--color-dado-dark)_72%,transparent)]"
                }`}
              >
                {statusMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] pt-8 sm:flex-row">
            <a
              href={phoneHref}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-dado-dark)_20%,transparent)] px-5 py-3 font-sans text-sm tracking-wide text-[var(--color-dado-dark)] transition hover:border-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]"
            >
              전화하기
            </a>

            <button
              type="button"
              onClick={handleSend}
              disabled={
                !message.trim() ||
                status === "sending" ||
                status === "dailyQuota" ||
                status === "monthlyQuota"
              }
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-dado-dark)] px-5 py-3 font-sans text-sm tracking-wide text-[var(--color-dado-bg)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {status === "sending" ? "전송 중..." : "메일 보내기"}
            </button>
          </div>

          {["fallback", "dailyQuota", "monthlyQuota"].includes(status) &&
          mailtoHref ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={mailtoHref}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-dado-dark)_20%,transparent)] px-5 py-3 font-sans text-sm tracking-wide text-[var(--color-dado-dark)] transition hover:border-[color-mix(in_srgb,var(--color-dado-dark)_45%,transparent)]"
              >
                메일 앱으로 보내기
              </a>
            </div>
          ) : null}
        </div>
      </SlideOver>

      {copyToastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-8 right-5 z-[10000] flex min-h-[4.75rem] w-[min(calc(100vw-2.5rem),24rem)] items-center justify-center rounded-full bg-white/1 px-7 py-4 text-center font-sans text-sm leading-6 text-[var(--color-dado-dark)] shadow-[0_18px_45px_-24px_rgba(17,24,39,0.55)] md:right-10"
        >
          <span className="break-keep">{copyToastMessage}</span>
        </div>
      ) : null}
    </>
  );
}
