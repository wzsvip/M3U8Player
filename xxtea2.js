var e = !0;
var n = 2654435769;
    function r(S, j) {
        var k = S.length
          , N = k << 2;
        if (j) {
            var A = S[k - 1];
            if (N -= 4,
            A < N - 3 || A > N)
                return null;
            N = A
        }
        for (var P = new Uint8Array(N), I = 0; I < N; ++I)
            P[I] = S[I >> 2] >> ((I & 3) << 3);
        return P
    }
    function a(S, j) {
        var k = S.length
          , N = k >> 2;
        (k & 3) !== 0 && ++N;
        var A;
        j ? (A = new Uint32Array(N + 1),
        A[N] = k) : A = new Uint32Array(N);
        for (var P = 0; P < k; ++P)
            A[P >> 2] |= S[P] << ((P & 3) << 3);
        return A
    }
    function i(S) {
        return S & 4294967295
    }
    function o(S, j, k, N, A, P) {
        return (k >>> 5 ^ j << 2) + (j >>> 3 ^ k << 4) ^ (S ^ j) + (P[N & 3 ^ A] ^ k)
    }
    function l(S) {
        if (S.length < 16) {
            var j = new Uint8Array(16);
            j.set(S),
            S = j
        }
        return S
    }
    function u(S, j) {
        var k = S.length, N = k - 1, A, P, I, w, O, x;
        for (P = S[N],
        I = 0,
        x = Math.floor(6 + 52 / k) | 0; x > 0; --x) {
            for (I = i(I + n),
            w = I >>> 2 & 3,
            O = 0; O < N; ++O)
                A = S[O + 1],
                P = S[O] = i(S[O] + o(I, A, P, O, w, j));
            A = S[0],
            P = S[N] = i(S[N] + o(I, A, P, N, w, j))
        }
        return S
    }
    function s(S, j) {
        var k = S.length, N = k - 1, A, P, I, w, O, x;
        for (A = S[0],
        x = Math.floor(6 + 52 / k),
        I = i(x * n); I !== 0; I = i(I - n)) {
            for (w = I >>> 2 & 3,
            O = N; O > 0; --O)
                P = S[O - 1],
                A = S[O] = i(S[O] - o(I, A, P, O, w, j));
            P = S[N],
            A = S[0] = i(S[0] - o(I, A, P, 0, w, j))
        }
        return S
    }
    function c(S) {
        for (var j = S.length, k = new Uint8Array(j * 3), N = 0, A = 0; A < j; A++) {
            var P = S.charCodeAt(A);
            if (P < 128)
                k[N++] = P;
            else if (P < 2048)
                k[N++] = 192 | P >> 6,
                k[N++] = 128 | P & 63;
            else if (P < 55296 || P > 57343)
                k[N++] = 224 | P >> 12,
                k[N++] = 128 | P >> 6 & 63,
                k[N++] = 128 | P & 63;
            else {
                if (A + 1 < j) {
                    var I = S.charCodeAt(A + 1);
                    if (P < 56320 && 56320 <= I && I <= 57343) {
                        var w = ((P & 1023) << 10 | I & 1023) + 65536;
                        k[N++] = 240 | w >> 18,
                        k[N++] = 128 | w >> 12 & 63,
                        k[N++] = 128 | w >> 6 & 63,
                        k[N++] = 128 | w & 63,
                        A++;
                        continue
                    }
                }
                throw new Error("Malformed string")
            }
        }
        return k.subarray(0, N)
    }
    function f(S, j) {
        for (var k = new Array(j), N = 0, A = 0, P = S.length; N < j && A < P; N++) {
            var I = S[A++];
            switch (I >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                k[N] = I;
                break;
            case 12:
            case 13:
                if (A < P)
                    k[N] = (I & 31) << 6 | S[A++] & 63;
                else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            case 14:
                if (A + 1 < P)
                    k[N] = (I & 15) << 12 | (S[A++] & 63) << 6 | S[A++] & 63;
                else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            case 15:
                if (A + 2 < P) {
                    var w = ((I & 7) << 18 | (S[A++] & 63) << 12 | (S[A++] & 63) << 6 | S[A++] & 63) - 65536;
                    if (0 <= w && w <= 1048575)
                        k[N++] = w >> 10 & 1023 | 55296,
                        k[N] = w & 1023 | 56320;
                    else
                        throw new Error("Character outside valid Unicode range: 0x" + w.toString(16))
                } else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            default:
                throw new Error("Bad UTF-8 encoding 0x" + I.toString(16))
            }
        }
        return N < j && (k.length = N),
        String.fromCharCode.apply(String, k)
    }
    function d(S, j) {
        for (var k = [], N = new Array(32768), A = 0, P = 0, I = S.length; A < j && P < I; A++) {
            var w = S[P++];
            switch (w >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                N[A] = w;
                break;
            case 12:
            case 13:
                if (P < I)
                    N[A] = (w & 31) << 6 | S[P++] & 63;
                else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            case 14:
                if (P + 1 < I)
                    N[A] = (w & 15) << 12 | (S[P++] & 63) << 6 | S[P++] & 63;
                else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            case 15:
                if (P + 2 < I) {
                    var O = ((w & 7) << 18 | (S[P++] & 63) << 12 | (S[P++] & 63) << 6 | S[P++] & 63) - 65536;
                    if (0 <= O && O <= 1048575)
                        N[A++] = O >> 10 & 1023 | 55296,
                        N[A] = O & 1023 | 56320;
                    else
                        throw new Error("Character outside valid Unicode range: 0x" + O.toString(16))
                } else
                    throw new Error("Unfinished UTF-8 octet sequence");
                break;
            default:
                throw new Error("Bad UTF-8 encoding 0x" + w.toString(16))
            }
            if (A >= 32767 - 1) {
                var x = A + 1;
                N.length = x,
                k.push(String.fromCharCode.apply(String, N)),
                j -= x,
                A = -1
            }
        }
        return A > 0 && (N.length = A,
        k.push(String.fromCharCode.apply(String, N))),
        k.join("")
    }
    function v(S) {
        if (!S)
            return "\u5BC6\u94A5\u9519\u8BEF";
        var j = S.length;
        return j === 0 ? "" : j < 32767 ? f(S, j) : d(S, j)
    }
    function p(S) {
        for (var j = S.length, k = new Array(S.length), N = 0; N < j; ++N)
            k[N] = S[N];
        return k
    }
    function h(S) {
        var j = S.length;
        if (j === 0)
            return "";
        var k = e ? S : p(S);
        if (j < 65535)
            return String.fromCharCode.apply(String, k);
        for (var N = j & 32767, A = j >> 15, P = new Array(N ? A + 1 : A), I = 0; I < A; ++I)
            P[I] = String.fromCharCode.apply(String, k.subarray(I << 15, I + 1 << 15));
        return N && (P[A] = String.fromCharCode.apply(String, k.subarray(A << 15, j))),
        P.join("")
    }
    function m(S) {
        for (var j = window.atob(S), k = j.length, N = new Uint8Array(k), A = 0; A < k; A++)
            N[A] = j.charCodeAt(A);
        return N
    }
    function y(S, j) {
        return typeof S == "string" && (S = c(S)),
        typeof j == "string" && (j = c(j)),
        S == null || S.length === 0 ? S : r(u(a(S, !0), a(l(j), !1)), !1)
    }
    function C(S, j) {
        return window.btoa(h(y(S, j)))
    }
    function _(S, j) {
        return typeof S == "string" && (S = m(S)),
        typeof j == "string" && (j = c(j)),
        S == null || S.length === 0 ? S : r(s(a(S, !1), a(l(j), !1)), !0)
    }
    function D(S, j) {
        return v(_(S, j))
    }


	
	
   const XXTEA = Object.create(null, {
        toBytes: {
            value: c
        },
        toString: {
            value: v
        },
        encrypt: {
            value: y
        },
        encryptToString: {
            value: C
        },
        decrypt: {
            value: _
        },
        decryptToString: {
            value: D
        }
    })