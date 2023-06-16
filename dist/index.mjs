import { useEffect as R, useState as h } from "react";
var m = (s) => s.replace(/\/$/g, ""),
  p = (s) => (s.startsWith("/") ? s : `/${s}`);
var y = class {
    baseUrl;
    headers;
    constructor(i, e) {
      (this.baseUrl = m(i || "/")),
        (this.headers = () => ({ "Content-Type": "application/json", Accept: "application/json", ...e?.() }));
    }
    async request(i, e = {}) {
      let f = {
          method: e.method || "GET",
          body: JSON.stringify(e.body || {}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...this.headers?.(),
            ...e?.headers,
          },
        },
        l = null,
        r = null,
        n,
        a,
        o = this.baseUrl + i;
      Object.keys(e.params || {}).length > 0 && (o += new URLSearchParams(e.params).toString());
      try {
        n = await fetch(o, f);
      } catch (d) {
        return console.error(d), (r = { status: 0, fetchResponse: null, data: null }), { data: l, error: r };
      }
      let u = await n.text();
      try {
        a = u ? JSON.parse(u) : null;
      } catch {
        a = u;
      }
      return n.ok ? (l = a) : (r = { status: n.status, fetchResponse: n, data: a }), { data: l, error: r };
    }
    useQuery(i, e) {
      let [f, l] = h(null),
        [r, n] = h(null),
        [a, o] = h(!0),
        u = async (d = {}) => {
          o(!0), e?.onLoadingStart?.();
          let { data: c, error: t } = await this.request(p(i), {
            headers: e?.headers,
            method: e?.method,
            params: d,
          });
          return (
            o(!1),
            e?.onLoadingEnd?.(),
            t
              ? (n(t), e?.onError?.({ status: t.status, fetchResponse: t.fetchResponse, data: c }))
              : c
              ? (l(c), e?.onSuccess?.(c))
              : console.log("No data or error returned from request!"),
            { data: c, error: t }
          );
        };
      return (
        R(() => {
          u(e?.params);
        }, []),
        { data: f, error: r, refetch: u, isLoading: a, isError: !!r }
      );
    }
    useMutation(i, e) {
      let [f, l] = h(null),
        [r, n] = h(null),
        [a, o] = h(!0);
      return {
        data: f,
        error: r,
        mutate: async (d, c) => {
          o(!0), e?.onLoadingStart?.();
          let { data: t, error: g } = await this.request(p(i), {
            body: d,
            headers: e?.headers,
            method: e?.method || "POST",
            params: c,
          });
          return (
            o(!1),
            e?.onLoadingEnd?.(),
            g
              ? (n(g), e?.onError?.({ status: g.status, fetchResponse: g.fetchResponse, data: t }))
              : t
              ? (l(t), e?.onSuccess?.(t))
              : console.log("No data or error returned from request!"),
            { data: t, error: g }
          );
        },
        isLoading: a,
        isError: !!r,
      };
    }
  },
  U = (s) => new y(s?.baseUrl, s?.headers);
export { U as createFetcher };
