const __MYWALLPAPER_WIDGET_RUNTIME_CONTRACT__ = "1";
if (!__canvasRuntime) {
      throw new Error('Canvas runtime globals are unavailable');
    }
if (!__canvasRuntime.react || !__canvasRuntime.reactJsxRuntime || !__canvasRuntime.sdkReact || !__canvasRuntime.sdkContracts || !__canvasRuntime.sdkPermissions) {
      throw new Error('Canvas runtime globals are unavailable');
    }
const __canvasRuntimeReact = __canvasRuntime.react;
const __canvasRuntimeJsxRuntime = __canvasRuntime.reactJsxRuntime;
const __canvasRuntimeSdk = __canvasRuntime.sdkReact;
const __canvasRuntimeSdkContracts = __canvasRuntime.sdkContracts;
const __canvasRuntimeSdkPermissions = __canvasRuntime.sdkPermissions;
const y = __canvasRuntimeJsxRuntime.jsxs;
const ne = __canvasRuntimeJsxRuntime.Fragment;
const r = __canvasRuntimeJsxRuntime.jsx;
const le = __canvasRuntimeSdk.useSettings;
const se = __canvasRuntimeSdk.useViewport;
const ue = __canvasRuntimeSdk.useFiles;
const de = __canvasRuntimeSdk.useAudio;
const ce = __canvasRuntimeSdk.useTheme;
const pe = __canvasRuntimeSdk.useNetwork;
const w = __canvasRuntimeReact.useState;
const x = __canvasRuntimeReact.useRef;
const C = __canvasRuntimeReact.useMemo;
const c = __canvasRuntimeReact.useCallback;
const k = __canvasRuntimeReact.useEffect;
const D = ["mp4", "webm", "ogg", "mov", "m4v", "avi", "mkv"], _ = ["jpg", "jpeg", "png", "gif", "webp", "svg", "ico", "bmp", "avif", "tiff"], q = ["mp3", "wav", "ogg", "flac", "aac", "m4a", "opus", "weba", "wma"], me = {
  youtube: {
    patterns: [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/shorts\/([^?]+)/
    ],
    embedUrl: (e, t) => {
      const u = new URLSearchParams({
        autoplay: t.autoplay ? "1" : "0",
        mute: t.muted ? "1" : "0",
        loop: t.loop ? "1" : "0",
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
        enablejsapi: "0"
      });
      return `https://www.youtube.com/embed/${e}?${u.toString()}`;
    }
  },
  vimeo: {
    patterns: [/vimeo\.com\/(\d+)/],
    embedUrl: (e, t) => `https://player.vimeo.com/video/${e}?autoplay=${t.autoplay ? 1 : 0}&muted=${t.muted ? 1 : 0}&loop=${t.loop ? 1 : 0}&background=1`
  },
  twitch: {
    patterns: [/twitch\.tv\/videos\/(\d+)/, /twitch\.tv\/([^/?]+)$/],
    embedUrl: (e, t, u) => {
      const p = typeof location < "u" ? location.hostname : "localhost";
      return u ? `https://player.twitch.tv/?video=${e}&parent=${p}&autoplay=${t.autoplay}` : `https://player.twitch.tv/?channel=${e}&parent=${p}&autoplay=${t.autoplay}&muted=${t.muted}`;
    }
  },
  dailymotion: {
    patterns: [/dailymotion\.com\/video\/([^_?]+)/],
    embedUrl: (e, t) => `https://www.dailymotion.com/embed/video/${e}?autoplay=${t.autoplay ? 1 : 0}&mute=${t.muted ? 1 : 0}`
  }
};
function fe(e, t = "") {
  if (!e) return null;
  if (t) {
    if (t.startsWith("video/")) return "video";
    if (t.startsWith("image/")) return "image";
    if (t.startsWith("audio/")) return "audio";
  }
  if (e.startsWith("data:"))
    return e.startsWith("data:video/") ? "video" : e.startsWith("data:image/") ? "image" : e.startsWith("data:audio/") ? "audio" : null;
  if (e.startsWith("blob:")) return "unknown";
  try {
    const m = new URL(e).pathname.toLowerCase().split(".").pop() || "";
    if (D.includes(m)) return "video";
    if (_.includes(m)) return "image";
    if (q.includes(m)) return "audio";
  } catch {
    const u = e.split(".").pop()?.toLowerCase().split("?")[0] || "";
    if (D.includes(u)) return "video";
    if (_.includes(u)) return "image";
    if (q.includes(u)) return "audio";
  }
  return e.includes("youtube.com") || e.includes("youtu.be") || e.includes("vimeo.com") || e.includes("dailymotion.com") ? null : "unknown";
}
function he(e) {
  const t = [];
  return e.blur > 0 && t.push(`blur(${e.blur}px)`), e.brightness !== 100 && t.push(`brightness(${e.brightness}%)`), e.contrast !== 100 && t.push(`contrast(${e.contrast}%)`), e.saturate !== 100 && t.push(`saturate(${e.saturate}%)`), e.hueRotate > 0 && t.push(`hue-rotate(${e.hueRotate}deg)`), t.length > 0 ? t.join(" ") : "none";
}
function be(e, t) {
  if (!e) return null;
  const u = {
    autoplay: t.autoplay ?? !0,
    muted: t.muted ?? !0,
    loop: t.loop ?? !1
  };
  for (const [p, m] of Object.entries(me))
    for (const a of m.patterns) {
      const E = e.match(a);
      if (E) {
        const I = E[1], l = p === "twitch" && e.includes("/videos/");
        return {
          platform: p,
          embedUrl: m.embedUrl(I, u, l),
          videoId: I
        };
      }
    }
  return null;
}
function H(e, t) {
  const u = e.split(".").pop()?.toLowerCase().split("?")[0] || "";
  return t === "video" ? {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mov: "video/quicktime",
    m4v: "video/mp4"
  }[u] || "" : {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    flac: "audio/flac",
    aac: "audio/aac",
    m4a: "audio/mp4",
    opus: "audio/opus",
    weba: "audio/webm",
    wma: "audio/x-ms-wma"
  }[u] || "";
}
const h = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    transition: "background-color 0.3s ease, border-radius 0.3s ease"
  },
  mediaWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 1
  },
  mediaElement: {
    width: "100%",
    height: "100%",
    display: "block",
    transition: "opacity 0.3s ease, filter 0.3s ease, border-radius 0.3s ease"
  },
  audioElement: {
    maxWidth: "90%",
    maxHeight: "60px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(20,20,30,0.95) 100%)"
  },
  embedFrame: {
    width: "100%",
    height: "100%",
    border: "none",
    background: "#000"
  },
  fallback: (e) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: e ? "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(20,20,30,0.95) 100%)" : "linear-gradient(135deg, rgba(240,240,245,0.95) 0%, rgba(220,220,230,0.98) 100%)",
    color: e ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
    textAlign: "center",
    padding: "20px",
    transition: "opacity 0.3s ease",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  }),
  fallbackIcon: {
    width: "64px",
    height: "64px",
    marginBottom: "16px",
    opacity: 0.4
  },
  fallbackText: {
    fontSize: "14px",
    fontWeight: 500,
    maxWidth: "200px",
    lineHeight: 1.4,
    margin: 0
  },
  loading: (e) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: e ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)"
  }),
  spinner: (e) => ({
    width: "40px",
    height: "40px",
    border: e ? "3px solid rgba(255,255,255,0.2)" : "3px solid rgba(0,0,0,0.1)",
    borderTopColor: e ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
    borderRadius: "50%",
    animation: "mw-media-spin 0.8s linear infinite"
  })
}, ye = `
@keyframes mw-media-spin {
  to { transform: rotate(360deg); }
}
`;
function ge() {
  return /* @__PURE__ */ r("div", { style: h.fallbackIcon, children: /* @__PURE__ */ y("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ r("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
    /* @__PURE__ */ r("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
    /* @__PURE__ */ r("polyline", { points: "21,15 16,10 5,21" })
  ] }) });
}
function ve({ isDark: e }) {
  return /* @__PURE__ */ r("div", { style: h.loading(e), children: /* @__PURE__ */ r("div", { style: h.spinner(e) }) });
}
function we({ message: e, isDark: t }) {
  return /* @__PURE__ */ y("div", { style: h.fallback(t), children: [
    /* @__PURE__ */ r(ge, {}),
    /* @__PURE__ */ r("p", { style: h.fallbackText, children: e })
  ] });
}
function Fe() {
  const e = le(), { width: t, height: u } = se(), { request: p, isFileReference: m } = ue(), a = de(), E = ce(), { fetch: I } = pe(), [l, S] = w(null), [g, U] = w(null), [$, j] = w(null), [L, i] = w(!0), [M, n] = w(null), N = x(null), P = x(null), d = x(!1), b = x(null), v = x(0), V = E.mode === "dark", A = C(() => he(e), [
    e.blur,
    e.brightness,
    e.contrast,
    e.saturate,
    e.hueRotate
  ]), F = C(
    () => ({
      ...h.mediaElement,
      objectFit: e.objectFit || "contain",
      objectPosition: e.objectPosition || "center",
      opacity: (e.opacity ?? 100) / 100,
      filter: A,
      borderRadius: `${e.borderRadius || 0}px`
    }),
    [e.objectFit, e.objectPosition, e.opacity, e.borderRadius, A]
  ), X = C(
    () => ({
      ...h.container,
      backgroundColor: e.backgroundColor || "transparent",
      borderRadius: `${e.borderRadius || 0}px`
    }),
    [e.backgroundColor, e.borderRadius]
  ), R = c(async () => {
    const o = ++v.current;
    i(!0), n(null), j(null), S(null), U(null), d.current && (a.stop(), d.current = !1);
    try {
      let s = null, O = "";
      if (e.sourceType === "file")
        if (m(e.mediaFile)) {
          const f = await p("mediaFile");
          if (o !== v.current) return;
          if (f)
            s = f;
          else {
            i(!1), n("No file uploaded");
            return;
          }
        } else {
          i(!1), n("No file uploaded");
          return;
        }
      else {
        const f = e.mediaUrl;
        if (!f || f.length === 0) {
          i(!1), n("No URL configured");
          return;
        }
        if (f.startsWith("data:")) {
          const B = f.match(/^data:([^;,]+)/);
          if (B && (O = B[1]), f.length < 50) {
            i(!1), n("File data is corrupted or too large");
            return;
          }
        }
        const W = be(f, e);
        if (W) {
          if (o !== v.current) return;
          j(W), U("embed"), S(W.embedUrl), i(!1);
          return;
        }
        s = f;
      }
      if (!s) {
        i(!1), n(e.sourceType === "file" ? "No file uploaded" : "No URL configured");
        return;
      }
      if (o !== v.current) return;
      const T = fe(s, O);
      if (T === null) {
        i(!1), n("Unsupported media type");
        return;
      }
      const ie = T === "unknown" ? "image" : T;
      S(s), U(ie);
    } catch (s) {
      if (o !== v.current) return;
      i(!1), n(s instanceof Error ? s.message : "Failed to load media");
    }
  }, [e.sourceType, e.mediaUrl, e.mediaFile, e.autoplay, e.muted, e.loop, m, p, a]);
  k(() => {
    R();
  }, [R]), k(() => {
    if (b.current && (clearInterval(b.current), b.current = null), e.refreshInterval > 0 && e.sourceType === "url") {
      const o = e.refreshInterval * 60 * 1e3;
      b.current = setInterval(() => {
        R();
      }, o);
    }
    return () => {
      b.current && (clearInterval(b.current), b.current = null);
    };
  }, [e.refreshInterval, e.sourceType, R]), k(() => {
    const o = N.current;
    if (o) {
      if (o.loop = e.loop, o.controls = e.showControls, o.playbackRate !== e.playbackRate && (o.playbackRate = e.playbackRate), !e.muted && !d.current) {
        const s = e.sourceType === "file" ? "mediaFile" : e.mediaUrl;
        s && (a.play(s), a.setVolume((e.volume ?? 80) / 100), d.current = !0);
      } else e.muted && d.current && (a.stop(), d.current = !1);
      d.current && a.setVolume((e.volume ?? 80) / 100), e.autoplay && o.paused ? o.play().catch(() => {
      }) : !e.autoplay && !o.paused && o.pause();
    }
  }, [
    e.loop,
    e.showControls,
    e.playbackRate,
    e.muted,
    e.volume,
    e.autoplay,
    e.sourceType,
    e.mediaUrl,
    a
  ]), k(() => {
    const o = P.current;
    o && (o.loop = e.loop, o.controls = e.showControls ?? !0, o.volume = (e.volume ?? 80) / 100, e.autoplay && o.paused ? o.play().catch(() => {
    }) : !e.autoplay && !o.paused && o.pause());
  }, [e.loop, e.showControls, e.volume, e.autoplay]), k(() => () => {
    d.current && (a.stop(), d.current = !1), b.current && clearInterval(b.current);
  }, [a]);
  const z = c(() => {
    i(!1), n(null);
  }, []), G = c(() => {
    i(!1), n(e.fallbackText || "Media unavailable");
  }, [e.fallbackText]), K = c(() => {
    i(!1), n(null);
  }, []), Y = c(() => {
    i(!1), n("Failed to load video");
  }, []), J = c(() => {
    i(!1), n(null);
  }, []), Q = c(() => {
    i(!1), n("Failed to load audio");
  }, []), Z = c(() => {
    i(!1), n(null);
  }, []), ee = c(() => {
    i(!1), n($ ? `Failed to load ${$.platform} video` : "Failed to load embed");
  }, [$]), te = c(() => {
    d.current && a.play(e.mediaUrl);
  }, [a, e.mediaUrl]), oe = c(() => {
    d.current && a.pause();
  }, [a]), re = c(() => {
    d.current && !e.loop && a.stop();
  }, [a, e.loop]), ae = () => {
    if (!l || !g) return null;
    if (g === "embed")
      return /* @__PURE__ */ r(
        "iframe",
        {
          src: l,
          style: { ...F, ...h.embedFrame },
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: !0,
          referrerPolicy: "no-referrer-when-downgrade",
          onLoad: Z,
          onError: ee
        }
      );
    if (g === "image")
      return /* @__PURE__ */ r(
        "img",
        {
          src: l,
          alt: "Media content",
          draggable: !1,
          style: F,
          onLoad: z,
          onError: G
        }
      );
    if (g === "video") {
      const o = l.startsWith("data:") || l.startsWith("blob:"), s = o ? void 0 : H(l, "video");
      return /* @__PURE__ */ y(
        "video",
        {
          ref: N,
          style: F,
          autoPlay: e.autoplay,
          loop: e.loop,
          muted: !0,
          controls: e.showControls,
          playsInline: !0,
          preload: "auto",
          onLoadedData: K,
          onError: Y,
          onPlay: te,
          onPause: oe,
          onEnded: re,
          children: [
            o ? null : /* @__PURE__ */ r("source", { src: l, type: s || void 0 }),
            o && /* @__PURE__ */ r("source", { src: l })
          ]
        }
      );
    }
    if (g === "audio") {
      const o = l.startsWith("data:") || l.startsWith("blob:"), s = o ? void 0 : H(l, "audio");
      return /* @__PURE__ */ y(
        "audio",
        {
          ref: P,
          style: {
            ...F,
            ...h.audioElement,
            display: "block",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          autoPlay: e.autoplay,
          loop: e.loop,
          muted: e.muted,
          controls: e.showControls ?? !0,
          preload: "auto",
          onLoadedData: J,
          onError: Q,
          children: [
            o ? null : /* @__PURE__ */ r("source", { src: l, type: s || void 0 }),
            o && /* @__PURE__ */ r("source", { src: l })
          ]
        }
      );
    }
    return null;
  };
  return /* @__PURE__ */ y(ne, { children: [
    /* @__PURE__ */ r("style", { children: ye }),
    /* @__PURE__ */ y("div", { style: X, children: [
      /* @__PURE__ */ r("div", { style: h.mediaWrapper, children: ae() }),
      M && !L && /* @__PURE__ */ r(we, { message: M, isDark: V }),
      L && /* @__PURE__ */ r(ve, { isDark: V })
    ] })
  ] });
}
export {
  Fe as default
};
