import {
  CommonModule
} from "./chunk-VRFZOILF.js";
import "./chunk-WMCYXEPE.js";
import {
  Component,
  DOCUMENT,
  Directive,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  PLATFORM_ID,
  TemplateRef,
  effect,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-G25W22AS.js";
import {
  Subject
} from "./chunk-RRJ5VVQO.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-KQSGOR2U.js";

// node_modules/@primeuix/utils/dist/dom/index.mjs
function p(t) {
  return typeof Element != "undefined" ? t instanceof Element : t !== null && typeof t == "object" && t.nodeType === 1 && typeof t.nodeName == "string";
}
__name(p, "p");
function A(t, e = {}) {
  if (p(t)) {
    let o = /* @__PURE__ */ __name((n, r) => {
      var l2, d;
      let i2 = (l2 = t == null ? void 0 : t.$attrs) != null && l2[n] ? [(d = t == null ? void 0 : t.$attrs) == null ? void 0 : d[n]] : [];
      return [r].flat().reduce((s3, a2) => {
        if (a2 != null) {
          let u = typeof a2;
          if (u === "string" || u === "number") s3.push(a2);
          else if (u === "object") {
            let c2 = Array.isArray(a2) ? o(n, a2) : Object.entries(a2).map(([f, g3]) => n === "style" && (g3 || g3 === 0) ? `${f.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g3}` : g3 ? f : void 0);
            s3 = c2.length ? s3.concat(c2.filter((f) => !!f)) : s3;
          }
        }
        return s3;
      }, i2);
    }, "o");
    Object.entries(e).forEach(([n, r]) => {
      if (r != null) {
        let i2 = n.match(/^on(.+)/);
        i2 ? t.addEventListener(i2[1].toLowerCase(), r) : n === "p-bind" || n === "pBind" ? A(t, r) : (r = n === "class" ? [...new Set(o("class", r))].join(" ").trim() : n === "style" ? o("style", r).join(";").trim() : r, (t.$attrs = t.$attrs || {}) && (t.$attrs[n] = r), t.setAttribute(n, r));
      }
    });
  }
}
__name(A, "A");
function Kt(t, e = "", o) {
  p(t) && o !== null && o !== void 0 && t.setAttribute(e, o);
}
__name(Kt, "Kt");

// node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s() {
  let r = /* @__PURE__ */ new Map();
  return { on(e, t) {
    let n = r.get(e);
    return n ? n.push(t) : n = [t], r.set(e, n), this;
  }, off(e, t) {
    let n = r.get(e);
    return n && n.splice(n.indexOf(t) >>> 0, 1), this;
  }, emit(e, t) {
    let n = r.get(e);
    n && n.forEach((i2) => {
      i2(t);
    });
  }, clear() {
    r.clear();
  } };
}
__name(s, "s");

// node_modules/@primeuix/utils/dist/object/index.mjs
function a(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
__name(a, "a");
function R(e, t, n = /* @__PURE__ */ new WeakSet()) {
  if (e === t) return true;
  if (!e || !t || typeof e != "object" || typeof t != "object" || n.has(e) || n.has(t)) return false;
  n.add(e).add(t);
  let r = Array.isArray(e), o = Array.isArray(t), u, f, h;
  if (r && o) {
    if (f = e.length, f != t.length) return false;
    for (u = f; u-- !== 0; ) if (!R(e[u], t[u], n)) return false;
    return true;
  }
  if (r != o) return false;
  let A2 = e instanceof Date, S2 = t instanceof Date;
  if (A2 != S2) return false;
  if (A2 && S2) return e.getTime() == t.getTime();
  let I = e instanceof RegExp, L = t instanceof RegExp;
  if (I != L) return false;
  if (I && L) return e.toString() == t.toString();
  let O = Object.keys(e);
  if (f = O.length, f !== Object.keys(t).length) return false;
  for (u = f; u-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t, O[u])) return false;
  for (u = f; u-- !== 0; ) if (h = O[u], !R(e[h], t[h], n)) return false;
  return true;
}
__name(R, "R");
function y(e, t) {
  return R(e, t);
}
__name(y, "y");
function l(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
__name(l, "l");
function s2(e) {
  return !a(e);
}
__name(s2, "s");
function c(e, t) {
  if (!e || !t) return null;
  try {
    let n = e[t];
    if (s2(n)) return n;
  } catch (n) {
  }
  if (Object.keys(e).length) {
    if (l(t)) return t(e);
    if (t.indexOf(".") === -1) return e[t];
    {
      let n = t.split("."), r = e;
      for (let o = 0, u = n.length; o < u; ++o) {
        if (r == null) return null;
        r = r[n[o]];
      }
      return r;
    }
  }
  return null;
}
__name(c, "c");
function k(e, t, n) {
  return n ? c(e, n) === c(t, n) : y(e, t);
}
__name(k, "k");
function i(e, t = true) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
__name(i, "i");
function m(e, ...t) {
  return l(e) ? e(...t) : e;
}
__name(m, "m");
function p2(e, t = true) {
  return typeof e == "string" && (t || e !== "");
}
__name(p2, "p");
function _(e) {
  return s2(e) && !isNaN(e);
}
__name(_, "_");
function z(e, t) {
  if (t) {
    let n = t.test(e);
    return t.lastIndex = 0, n;
  }
  return false;
}
__name(z, "z");
function G(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
__name(G, "G");
function Y(e) {
  if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
    let n = { A: /[\xC0-\xC5\u0100\u0102\u0104]/g, AE: /[\xC6]/g, C: /[\xC7\u0106\u0108\u010A\u010C]/g, D: /[\xD0\u010E\u0110]/g, E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g, G: /[\u011C\u011E\u0120\u0122]/g, H: /[\u0124\u0126]/g, I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g, IJ: /[\u0132]/g, J: /[\u0134]/g, K: /[\u0136]/g, L: /[\u0139\u013B\u013D\u013F\u0141]/g, N: /[\xD1\u0143\u0145\u0147\u014A]/g, O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g, OE: /[\u0152]/g, R: /[\u0154\u0156\u0158]/g, S: /[\u015A\u015C\u015E\u0160]/g, T: /[\u0162\u0164\u0166]/g, U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g, W: /[\u0174]/g, Y: /[\xDD\u0176\u0178]/g, Z: /[\u0179\u017B\u017D]/g, a: /[\xE0-\xE5\u0101\u0103\u0105]/g, ae: /[\xE6]/g, c: /[\xE7\u0107\u0109\u010B\u010D]/g, d: /[\u010F\u0111]/g, e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g, g: /[\u011D\u011F\u0121\u0123]/g, i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g, ij: /[\u0133]/g, j: /[\u0135]/g, k: /[\u0137,\u0138]/g, l: /[\u013A\u013C\u013E\u0140\u0142]/g, n: /[\xF1\u0144\u0146\u0148\u014B]/g, p: /[\xFE]/g, o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g, oe: /[\u0153]/g, r: /[\u0155\u0157\u0159]/g, s: /[\u015B\u015D\u015F\u0161]/g, t: /[\u0163\u0165\u0167]/g, u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g, w: /[\u0175]/g, y: /[\xFD\xFF\u0177]/g, z: /[\u017A\u017C\u017E]/g };
    for (let r in n) e = e.replace(n[r], r);
  }
  return e;
}
__name(Y, "Y");
function ee(e) {
  return p2(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, n) => n === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
__name(ee, "ee");

// node_modules/@primeuix/utils/dist/zindex/index.mjs
function g() {
  let r = [], i2 = /* @__PURE__ */ __name((e, n, t = 999) => {
    let s3 = u(e, n, t), o = s3.value + (s3.key === e ? 0 : t) + 1;
    return r.push({ key: e, value: o }), o;
  }, "i"), d = /* @__PURE__ */ __name((e) => {
    r = r.filter((n) => n.value !== e);
  }, "d"), a2 = /* @__PURE__ */ __name((e, n) => u(e, n).value, "a"), u = /* @__PURE__ */ __name((e, n, t = 0) => [...r].reverse().find((s3) => n ? true : s3.key === e) || { key: e, value: t }, "u"), l2 = /* @__PURE__ */ __name((e) => e && parseInt(e.style.zIndex, 10) || 0, "l");
  return { get: l2, set: /* @__PURE__ */ __name((e, n, t) => {
    n && (n.style.zIndex = String(i2(e, true, t)));
  }, "set"), clear: /* @__PURE__ */ __name((e) => {
    e && (d(l2(e)), e.style.zIndex = "");
  }, "clear"), getCurrent: /* @__PURE__ */ __name((e) => a2(e, true), "getCurrent") };
}
__name(g, "g");
var x = g();

// node_modules/primeng/fesm2022/primeng-api.mjs
var _c0 = ["*"];
var ConfirmEventType;
(function(ConfirmEventType2) {
  ConfirmEventType2[ConfirmEventType2["ACCEPT"] = 0] = "ACCEPT";
  ConfirmEventType2[ConfirmEventType2["REJECT"] = 1] = "REJECT";
  ConfirmEventType2[ConfirmEventType2["CANCEL"] = 2] = "CANCEL";
})(ConfirmEventType || (ConfirmEventType = {}));
var _ConfirmationService = class _ConfirmationService {
  requireConfirmationSource = new Subject();
  acceptConfirmationSource = new Subject();
  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept = this.acceptConfirmationSource.asObservable();
  /**
   * Callback to invoke on confirm.
   * @param {Confirmation} confirmation - Represents a confirmation dialog configuration.
   * @group Method
   */
  confirm(confirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }
  /**
   * Closes the dialog.
   * @group Method
   */
  close() {
    this.requireConfirmationSource.next(null);
    return this;
  }
  /**
   * Accepts the dialog.
   * @group Method
   */
  onAccept() {
    this.acceptConfirmationSource.next(null);
  }
};
__name(_ConfirmationService, "ConfirmationService");
__publicField(_ConfirmationService, "ɵfac", /* @__PURE__ */ __name(function ConfirmationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ConfirmationService)();
}, "ConfirmationService_Factory"));
__publicField(_ConfirmationService, "ɵprov", ɵɵdefineInjectable({
  token: _ConfirmationService,
  factory: _ConfirmationService.ɵfac
}));
var ConfirmationService = _ConfirmationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationService, [{
    type: Injectable
  }], null, null);
})();
var _ContextMenuService = class _ContextMenuService {
  activeItemKeyChange = new Subject();
  activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
  activeItemKey;
  changeKey(key) {
    this.activeItemKey = key;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
  reset() {
    this.activeItemKey = null;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
};
__name(_ContextMenuService, "ContextMenuService");
__publicField(_ContextMenuService, "ɵfac", /* @__PURE__ */ __name(function ContextMenuService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ContextMenuService)();
}, "ContextMenuService_Factory"));
__publicField(_ContextMenuService, "ɵprov", ɵɵdefineInjectable({
  token: _ContextMenuService,
  factory: _ContextMenuService.ɵfac
}));
var ContextMenuService = _ContextMenuService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuService, [{
    type: Injectable
  }], null, null);
})();
var _FilterMatchMode = class _FilterMatchMode {
};
__name(_FilterMatchMode, "FilterMatchMode");
__publicField(_FilterMatchMode, "STARTS_WITH", "startsWith");
__publicField(_FilterMatchMode, "CONTAINS", "contains");
__publicField(_FilterMatchMode, "NOT_CONTAINS", "notContains");
__publicField(_FilterMatchMode, "ENDS_WITH", "endsWith");
__publicField(_FilterMatchMode, "EQUALS", "equals");
__publicField(_FilterMatchMode, "NOT_EQUALS", "notEquals");
__publicField(_FilterMatchMode, "IN", "in");
__publicField(_FilterMatchMode, "LESS_THAN", "lt");
__publicField(_FilterMatchMode, "LESS_THAN_OR_EQUAL_TO", "lte");
__publicField(_FilterMatchMode, "GREATER_THAN", "gt");
__publicField(_FilterMatchMode, "GREATER_THAN_OR_EQUAL_TO", "gte");
__publicField(_FilterMatchMode, "BETWEEN", "between");
__publicField(_FilterMatchMode, "IS", "is");
__publicField(_FilterMatchMode, "IS_NOT", "isNot");
__publicField(_FilterMatchMode, "BEFORE", "before");
__publicField(_FilterMatchMode, "AFTER", "after");
__publicField(_FilterMatchMode, "DATE_IS", "dateIs");
__publicField(_FilterMatchMode, "DATE_IS_NOT", "dateIsNot");
__publicField(_FilterMatchMode, "DATE_BEFORE", "dateBefore");
__publicField(_FilterMatchMode, "DATE_AFTER", "dateAfter");
var FilterMatchMode = _FilterMatchMode;
var _FilterService = class _FilterService {
  filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    let filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          let fieldValue = c(item, field);
          if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  }
  filters = {
    startsWith: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = Y(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = Y(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    }, "startsWith"),
    contains: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = Y(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = Y(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    }, "contains"),
    notContains: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = Y(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = Y(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    }, "notContains"),
    endsWith: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = Y(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = Y(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    }, "endsWith"),
    equals: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
      else if (value == filter) return true;
      else return Y(value.toString()).toLocaleLowerCase(filterLocale) == Y(filter.toString()).toLocaleLowerCase(filterLocale);
    }, "equals"),
    notEquals: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
      else if (value == filter) return false;
      else return Y(value.toString()).toLocaleLowerCase(filterLocale) != Y(filter.toString()).toLocaleLowerCase(filterLocale);
    }, "notEquals"),
    in: /* @__PURE__ */ __name((value, filter) => {
      if (filter === void 0 || filter === null || filter.length === 0) {
        return true;
      }
      for (let i2 = 0; i2 < filter.length; i2++) {
        if (k(value, filter[i2])) {
          return true;
        }
      }
      return false;
    }, "in"),
    between: /* @__PURE__ */ __name((value, filter) => {
      if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
      else return filter[0] <= value && value <= filter[1];
    }, "between"),
    lt: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
      else return value < filter;
    }, "lt"),
    lte: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
      else return value <= filter;
    }, "lte"),
    gt: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
      else return value > filter;
    }, "gt"),
    gte: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
      else return value >= filter;
    }, "gte"),
    is: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      return this.filters.equals(value, filter, filterLocale);
    }, "is"),
    isNot: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      return this.filters.notEquals(value, filter, filterLocale);
    }, "isNot"),
    before: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      return this.filters.lt(value, filter, filterLocale);
    }, "before"),
    after: /* @__PURE__ */ __name((value, filter, filterLocale) => {
      return this.filters.gt(value, filter, filterLocale);
    }, "after"),
    dateIs: /* @__PURE__ */ __name((value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter.toDateString();
    }, "dateIs"),
    dateIsNot: /* @__PURE__ */ __name((value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter.toDateString();
    }, "dateIsNot"),
    dateBefore: /* @__PURE__ */ __name((value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter.getTime();
    }, "dateBefore"),
    dateAfter: /* @__PURE__ */ __name((value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      value.setHours(0, 0, 0, 0);
      return value.getTime() > filter.getTime();
    }, "dateAfter")
  };
  register(rule, fn) {
    this.filters[rule] = fn;
  }
};
__name(_FilterService, "FilterService");
__publicField(_FilterService, "ɵfac", /* @__PURE__ */ __name(function FilterService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilterService)();
}, "FilterService_Factory"));
__publicField(_FilterService, "ɵprov", ɵɵdefineInjectable({
  token: _FilterService,
  factory: _FilterService.ɵfac,
  providedIn: "root"
}));
var FilterService = _FilterService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _MessageService = class _MessageService {
  messageSource = new Subject();
  clearSource = new Subject();
  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();
  /**
   * Inserts single message.
   * @param {ToastMessageOptions} message - Message to be added.
   * @group Method
   */
  add(message) {
    if (message) {
      this.messageSource.next(message);
    }
  }
  /**
   * Inserts new messages.
   * @param {Message[]} messages - Messages to be added.
   * @group Method
   */
  addAll(messages) {
    if (messages && messages.length) {
      this.messageSource.next(messages);
    }
  }
  /**
   * Clears the message with the given key.
   * @param {string} key - Key of the message to be cleared.
   * @group Method
   */
  clear(key) {
    this.clearSource.next(key || null);
  }
};
__name(_MessageService, "MessageService");
__publicField(_MessageService, "ɵfac", /* @__PURE__ */ __name(function MessageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageService)();
}, "MessageService_Factory"));
__publicField(_MessageService, "ɵprov", ɵɵdefineInjectable({
  token: _MessageService,
  factory: _MessageService.ɵfac
}));
var MessageService = _MessageService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], null, null);
})();
var _OverlayService = class _OverlayService {
  clickSource = new Subject();
  clickObservable = this.clickSource.asObservable();
  add(event) {
    if (event) {
      this.clickSource.next(event);
    }
  }
};
__name(_OverlayService, "OverlayService");
__publicField(_OverlayService, "ɵfac", /* @__PURE__ */ __name(function OverlayService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OverlayService)();
}, "OverlayService_Factory"));
__publicField(_OverlayService, "ɵprov", ɵɵdefineInjectable({
  token: _OverlayService,
  factory: _OverlayService.ɵfac,
  providedIn: "root"
}));
var OverlayService = _OverlayService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _Header = class _Header {
};
__name(_Header, "Header");
__publicField(_Header, "ɵfac", /* @__PURE__ */ __name(function Header_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Header)();
}, "Header_Factory"));
__publicField(_Header, "ɵcmp", ɵɵdefineComponent({
  type: _Header,
  selectors: [["p-header"]],
  standalone: false,
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: /* @__PURE__ */ __name(function Header_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  }, "Header_Template"),
  encapsulation: 2
}));
var Header = _Header;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{
      selector: "p-header",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var _Footer = class _Footer {
};
__name(_Footer, "Footer");
__publicField(_Footer, "ɵfac", /* @__PURE__ */ __name(function Footer_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Footer)();
}, "Footer_Factory"));
__publicField(_Footer, "ɵcmp", ɵɵdefineComponent({
  type: _Footer,
  selectors: [["p-footer"]],
  standalone: false,
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: /* @__PURE__ */ __name(function Footer_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  }, "Footer_Template"),
  encapsulation: 2
}));
var Footer = _Footer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{
      selector: "p-footer",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var _PrimeTemplate = class _PrimeTemplate {
  template;
  type;
  name;
  constructor(template) {
    this.template = template;
  }
  getType() {
    return this.name;
  }
};
__name(_PrimeTemplate, "PrimeTemplate");
__publicField(_PrimeTemplate, "ɵfac", /* @__PURE__ */ __name(function PrimeTemplate_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PrimeTemplate)(ɵɵdirectiveInject(TemplateRef));
}, "PrimeTemplate_Factory"));
__publicField(_PrimeTemplate, "ɵdir", ɵɵdefineDirective({
  type: _PrimeTemplate,
  selectors: [["", "pTemplate", ""]],
  inputs: {
    type: "type",
    name: [0, "pTemplate", "name"]
  }
}));
var PrimeTemplate = _PrimeTemplate;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeTemplate, [{
    type: Directive,
    args: [{
      selector: "[pTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], {
    type: [{
      type: Input
    }],
    name: [{
      type: Input,
      args: ["pTemplate"]
    }]
  });
})();
var _SharedModule = class _SharedModule {
};
__name(_SharedModule, "SharedModule");
__publicField(_SharedModule, "ɵfac", /* @__PURE__ */ __name(function SharedModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SharedModule)();
}, "SharedModule_Factory"));
__publicField(_SharedModule, "ɵmod", ɵɵdefineNgModule({
  type: _SharedModule,
  declarations: [Header, Footer],
  imports: [CommonModule, PrimeTemplate],
  exports: [Header, Footer, PrimeTemplate]
}));
__publicField(_SharedModule, "ɵinj", ɵɵdefineInjector({
  imports: [CommonModule]
}));
var SharedModule = _SharedModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PrimeTemplate],
      exports: [Header, Footer, PrimeTemplate],
      declarations: [Header, Footer]
    }]
  }], null, null);
})();
var _TreeDragDropService = class _TreeDragDropService {
  dragStartSource = new Subject();
  dragStopSource = new Subject();
  dragStart$ = this.dragStartSource.asObservable();
  dragStop$ = this.dragStopSource.asObservable();
  startDrag(event) {
    this.dragStartSource.next(event);
  }
  stopDrag(event) {
    this.dragStopSource.next(event);
  }
};
__name(_TreeDragDropService, "TreeDragDropService");
__publicField(_TreeDragDropService, "ɵfac", /* @__PURE__ */ __name(function TreeDragDropService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TreeDragDropService)();
}, "TreeDragDropService_Factory"));
__publicField(_TreeDragDropService, "ɵprov", ɵɵdefineInjectable({
  token: _TreeDragDropService,
  factory: _TreeDragDropService.ɵfac
}));
var TreeDragDropService = _TreeDragDropService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeDragDropService, [{
    type: Injectable
  }], null, null);
})();

// node_modules/@primeuix/styled/dist/index.mjs
var rt = Object.defineProperty;
var st = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F2 = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty;
var be = Object.prototype.propertyIsEnumerable;
var _e = /* @__PURE__ */ __name((e, t, r) => t in e ? rt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "_e");
var g2 = /* @__PURE__ */ __name((e, t) => {
  for (var r in t || (t = {})) xe.call(t, r) && _e(e, r, t[r]);
  if (F2) for (var r of F2(t)) be.call(t, r) && _e(e, r, t[r]);
  return e;
}, "g");
var $ = /* @__PURE__ */ __name((e, t) => st(e, nt(t)), "$");
var v = /* @__PURE__ */ __name((e, t) => {
  var r = {};
  for (var s3 in e) xe.call(e, s3) && t.indexOf(s3) < 0 && (r[s3] = e[s3]);
  if (e != null && F2) for (var s3 of F2(e)) t.indexOf(s3) < 0 && be.call(e, s3) && (r[s3] = e[s3]);
  return r;
}, "v");
var at = s();
var N = at;
var k2 = /{([^}]*)}/g;
var ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ie = /var\([^)]+\)/g;
function oe(e) {
  return p2(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
__name(oe, "oe");
function ve(e) {
  return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
__name(ve, "ve");
function dt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
__name(dt, "dt");
function Q(e = "", t = "") {
  return dt(`${p2(e, false) && p2(t, false) ? `${e}-` : e}${t}`);
}
__name(Q, "Q");
function ae(e = "", t = "") {
  return `--${Q(e, t)}`;
}
__name(ae, "ae");
function gt(e = "") {
  let t = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t + r) % 2 !== 0;
}
__name(gt, "gt");
function Y2(e, t = "", r = "", s3 = [], i2) {
  if (p2(e)) {
    let a2 = e.trim();
    if (gt(a2)) return;
    if (z(a2, k2)) {
      let n = a2.replaceAll(k2, (l2) => {
        let c2 = l2.replace(/{|}/g, "").split(".").filter((m2) => !s3.some((d) => z(m2, d)));
        return `var(${ae(r, ee(c2.join("-")))}${s2(i2) ? `, ${i2}` : ""})`;
      });
      return z(n.replace(ie, "0"), ne) ? `calc(${n})` : n;
    }
    return a2;
  } else if (_(e)) return e;
}
__name(Y2, "Y");
function Re(e, t, r) {
  p2(t, false) && e.push(`${t}:${r};`);
}
__name(Re, "Re");
function C(e, t) {
  return e ? `${e}{${t}}` : "";
}
__name(C, "C");
function le(e, t) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n, l2) {
    let o = [], c2 = 0, m2 = "", d = null, u = 0;
    for (; c2 <= n.length; ) {
      let h = n[c2];
      if ((h === '"' || h === "'" || h === "`") && n[c2 - 1] !== "\\" && (d = d === h ? null : h), !d && (h === "(" && u++, h === ")" && u--, (h === "," || c2 === n.length) && u === 0)) {
        let f = m2.trim();
        f.startsWith("dt(") ? o.push(le(f, l2)) : o.push(s3(f)), m2 = "", c2++;
        continue;
      }
      h !== void 0 && (m2 += h), c2++;
    }
    return o;
  }
  __name(r, "r");
  function s3(n) {
    let l2 = n[0];
    if ((l2 === '"' || l2 === "'" || l2 === "`") && n[n.length - 1] === l2) return n.slice(1, -1);
    let o = Number(n);
    return isNaN(o) ? n : o;
  }
  __name(s3, "s");
  let i2 = [], a2 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a2.push(n), n += 2;
  else if (e[n] === ")" && a2.length > 0) {
    let l2 = a2.pop();
    a2.length === 0 && i2.push([l2, n]);
  }
  if (!i2.length) return e;
  for (let n = i2.length - 1; n >= 0; n--) {
    let [l2, o] = i2[n], c2 = e.slice(l2 + 3, o), m2 = r(c2, t), d = t(...m2);
    e = e.slice(0, l2) + d + e.slice(o + 1);
  }
  return e;
}
__name(le, "le");
var E = /* @__PURE__ */ __name((...e) => ue(S.getTheme(), ...e), "E");
var ue = /* @__PURE__ */ __name((e = {}, t, r, s3) => {
  if (t) {
    let { variable: i2, options: a2 } = S.defaults || {}, { prefix: n, transform: l2 } = (e == null ? void 0 : e.options) || a2 || {}, o = z(t, k2) ? t : `{${t}}`;
    return s3 === "value" || a(s3) && l2 === "strict" ? S.getTokenValue(t) : Y2(o, void 0, n, [i2.excludedKeyRegex], r);
  }
  return "";
}, "ue");
function ar(e, ...t) {
  if (e instanceof Array) {
    let r = e.reduce((s3, i2, a2) => {
      var n;
      return s3 + i2 + ((n = m(t[a2], { dt: E })) != null ? n : "");
    }, "");
    return le(r, E);
  }
  return m(e, { dt: E });
}
__name(ar, "ar");
function de(e, t = {}) {
  let r = S.defaults.variable, { prefix: s3 = r.prefix, selector: i2 = r.selector, excludedKeyRegex: a2 = r.excludedKeyRegex } = t, n = [], l2 = [], o = [{ node: e, path: s3 }];
  for (; o.length; ) {
    let { node: m2, path: d } = o.pop();
    for (let u in m2) {
      let h = m2[u], f = ve(h), p3 = z(u, a2) ? Q(d) : Q(d, ee(u));
      if (i(f)) o.push({ node: f, path: p3 });
      else {
        let y2 = ae(p3), R2 = Y2(f, p3, s3, [a2]);
        Re(l2, y2, R2);
        let T = p3;
        s3 && T.startsWith(s3 + "-") && (T = T.slice(s3.length + 1)), n.push(T.replace(/-/g, "."));
      }
    }
  }
  let c2 = l2.join("");
  return { value: l2, tokens: n, declarations: c2, css: C(i2, c2) };
}
__name(de, "de");
var b2 = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s3;
    return (s3 = t.map((i2) => i2.resolve(r)).find((i2) => i2.matched)) != null ? s3 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t) {
  return de(e, { prefix: t == null ? void 0 : t.prefix });
}, getCommon({ name: e = "", theme: t = {}, params: r, set: s3, defaults: i2 }) {
  var R2, T, j, O, M, z2, V;
  let { preset: a2, options: n } = t, l2, o, c2, m2, d, u, h;
  if (s2(a2) && n.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re } = a2, f = te || {}, { colorScheme: K } = f, A2 = v(f, ["colorScheme"]), x2 = re || {}, { colorScheme: X } = x2, G2 = v(x2, ["colorScheme"]), p3 = K || {}, { dark: U2 } = p3, B = v(p3, ["dark"]), y2 = X || {}, { dark: I } = y2, H = v(y2, ["dark"]), W = s2(L) ? this._toVariables({ primitive: L }, n) : {}, q2 = s2(A2) ? this._toVariables({ semantic: A2 }, n) : {}, Z = s2(B) ? this._toVariables({ light: B }, n) : {}, pe = s2(U2) ? this._toVariables({ dark: U2 }, n) : {}, fe = s2(G2) ? this._toVariables({ semantic: G2 }, n) : {}, ye = s2(H) ? this._toVariables({ light: H }, n) : {}, Se = s2(I) ? this._toVariables({ dark: I }, n) : {}, [Me, ze] = [(R2 = W.declarations) != null ? R2 : "", W.tokens], [Ke, Xe] = [(T = q2.declarations) != null ? T : "", q2.tokens || []], [Ge, Ue] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Be, Ie] = [(O = pe.declarations) != null ? O : "", pe.tokens || []], [He, We] = [(M = fe.declarations) != null ? M : "", fe.tokens || []], [qe, Ze] = [(z2 = ye.declarations) != null ? z2 : "", ye.tokens || []], [Fe, Je] = [(V = Se.declarations) != null ? V : "", Se.tokens || []];
    l2 = this.transformCSS(e, Me, "light", "variable", n, s3, i2), o = ze;
    let Qe = this.transformCSS(e, `${Ke}${Ge}`, "light", "variable", n, s3, i2), Ye = this.transformCSS(e, `${Be}`, "dark", "variable", n, s3, i2);
    c2 = `${Qe}${Ye}`, m2 = [.../* @__PURE__ */ new Set([...Xe, ...Ue, ...Ie])];
    let et = this.transformCSS(e, `${He}${qe}color-scheme:light`, "light", "variable", n, s3, i2), tt = this.transformCSS(e, `${Fe}color-scheme:dark`, "dark", "variable", n, s3, i2);
    d = `${et}${tt}`, u = [.../* @__PURE__ */ new Set([...We, ...Ze, ...Je])], h = m(a2.css, { dt: E });
  }
  return { primitive: { css: l2, tokens: o }, semantic: { css: c2, tokens: m2 }, global: { css: d, tokens: u }, style: h };
}, getPreset({ name: e = "", preset: t = {}, options: r, params: s3, set: i2, defaults: a2, selector: n }) {
  var f, x2, p3;
  let l2, o, c2;
  if (s2(t) && r.transform !== "strict") {
    let y2 = e.replace("-directive", ""), m2 = t, { colorScheme: R2, extend: T, css: j } = m2, O = v(m2, ["colorScheme", "extend", "css"]), d = T || {}, { colorScheme: M } = d, z2 = v(d, ["colorScheme"]), u = R2 || {}, { dark: V } = u, L = v(u, ["dark"]), h = M || {}, { dark: te } = h, re = v(h, ["dark"]), K = s2(O) ? this._toVariables({ [y2]: g2(g2({}, O), z2) }, r) : {}, A2 = s2(L) ? this._toVariables({ [y2]: g2(g2({}, L), re) }, r) : {}, X = s2(V) ? this._toVariables({ [y2]: g2(g2({}, V), te) }, r) : {}, [G2, U2] = [(f = K.declarations) != null ? f : "", K.tokens || []], [B, I] = [(x2 = A2.declarations) != null ? x2 : "", A2.tokens || []], [H, W] = [(p3 = X.declarations) != null ? p3 : "", X.tokens || []], q2 = this.transformCSS(y2, `${G2}${B}`, "light", "variable", r, i2, a2, n), Z = this.transformCSS(y2, H, "dark", "variable", r, i2, a2, n);
    l2 = `${q2}${Z}`, o = [.../* @__PURE__ */ new Set([...U2, ...I, ...W])], c2 = m(j, { dt: E });
  }
  return { css: l2, tokens: o, style: c2 };
}, getPresetC({ name: e = "", theme: t = {}, params: r, set: s3, defaults: i2 }) {
  var o;
  let { preset: a2, options: n } = t, l2 = (o = a2 == null ? void 0 : a2.components) == null ? void 0 : o[e];
  return this.getPreset({ name: e, preset: l2, options: n, params: r, set: s3, defaults: i2 });
}, getPresetD({ name: e = "", theme: t = {}, params: r, set: s3, defaults: i2 }) {
  var c2, m2;
  let a2 = e.replace("-directive", ""), { preset: n, options: l2 } = t, o = ((c2 = n == null ? void 0 : n.components) == null ? void 0 : c2[a2]) || ((m2 = n == null ? void 0 : n.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: o, options: l2, params: r, set: s3, defaults: i2 });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t.options.darkModeSelector) : [];
}, getLayerOrder(e, t = {}, r, s3) {
  let { cssLayer: i2 } = t;
  return i2 ? `@layer ${m(i2.order || i2.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: i2, defaults: a2 }) {
  let n = this.getCommon({ name: e, theme: t, params: r, set: i2, defaults: a2 }), l2 = Object.entries(s3).reduce((o, [c2, m2]) => o.push(`${c2}="${m2}"`) && o, []).join(" ");
  return Object.entries(n || {}).reduce((o, [c2, m2]) => {
    if (i(m2) && Object.hasOwn(m2, "css")) {
      let d = G(m2.css), u = `${c2}-variables`;
      o.push(`<style type="text/css" data-primevue-style-id="${u}" ${l2}>${d}</style>`);
    }
    return o;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: i2, defaults: a2 }) {
  var c2;
  let n = { name: e, theme: t, params: r, set: i2, defaults: a2 }, l2 = (c2 = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c2.css, o = Object.entries(s3).reduce((m2, [d, u]) => m2.push(`${d}="${u}"`) && m2, []).join(" ");
  return l2 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${o}>${G(l2)}</style>` : "";
}, createTokens(e = {}, t, r = "", s3 = "", i2 = {}) {
  let a2 = /* @__PURE__ */ __name(function(l2, o = {}, c2 = []) {
    if (c2.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: l2, path: this.path, paths: o, value: void 0 };
    c2.push(this.path), o.name = this.path, o.binding || (o.binding = {});
    let m2 = this.value;
    if (typeof this.value == "string" && k2.test(this.value)) {
      let u = this.value.trim().replace(k2, (h) => {
        var y2;
        let f = h.slice(1, -1), x2 = this.tokens[f];
        if (!x2) return console.warn(`Token not found for path: ${f}`), "__UNRESOLVED__";
        let p3 = x2.computed(l2, o, c2);
        return Array.isArray(p3) && p3.length === 2 ? `light-dark(${p3[0].value},${p3[1].value})` : (y2 = p3 == null ? void 0 : p3.value) != null ? y2 : "__UNRESOLVED__";
      });
      m2 = ne.test(u.replace(ie, "0")) ? `calc(${u})` : u;
    }
    return a(o.binding) && delete o.binding, c2.pop(), { colorScheme: l2, path: this.path, paths: o, value: m2.includes("__UNRESOLVED__") ? void 0 : m2 };
  }, "a"), n = /* @__PURE__ */ __name((l2, o, c2) => {
    Object.entries(l2).forEach(([m2, d]) => {
      let u = z(m2, t.variable.excludedKeyRegex) ? o : o ? `${o}.${oe(m2)}` : oe(m2), h = c2 ? `${c2}.${m2}` : m2;
      i(d) ? n(d, u, h) : (i2[u] || (i2[u] = { paths: [], computed: /* @__PURE__ */ __name((f, x2 = {}, p3 = []) => {
        if (i2[u].paths.length === 1) return i2[u].paths[0].computed(i2[u].paths[0].scheme, x2.binding, p3);
        if (f && f !== "none") for (let y2 = 0; y2 < i2[u].paths.length; y2++) {
          let R2 = i2[u].paths[y2];
          if (R2.scheme === f) return R2.computed(f, x2.binding, p3);
        }
        return i2[u].paths.map((y2) => y2.computed(y2.scheme, x2[y2.scheme], p3));
      }, "computed") }), i2[u].paths.push({ path: h, value: d, scheme: h.includes("colorScheme.light") ? "light" : h.includes("colorScheme.dark") ? "dark" : "none", computed: a2, tokens: i2 }));
    });
  }, "n");
  return n(e, r, s3), i2;
}, getTokenValue(e, t, r) {
  var l2;
  let i2 = ((o) => o.split(".").filter((m2) => !z(m2.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a2 = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, n = [(l2 = e[i2]) == null ? void 0 : l2.computed(a2)].flat().filter((o) => o);
  return n.length === 1 ? n[0].value : n.reduce((o = {}, c2) => {
    let u = c2, { colorScheme: m2 } = u, d = v(u, ["colorScheme"]);
    return o[m2] = d, o;
  }, void 0);
}, getSelectorRule(e, t, r, s3) {
  return r === "class" || r === "attr" ? C(s2(t) ? `${e}${t},${e} ${t}` : e, s3) : C(e, C(t != null ? t : ":root", s3));
}, transformCSS(e, t, r, s3, i2 = {}, a2, n, l2) {
  if (s2(t)) {
    let { cssLayer: o } = i2;
    if (s3 !== "style") {
      let c2 = this.getColorSchemeOption(i2, n);
      t = r === "dark" ? c2.reduce((m2, { type: d, selector: u }) => (s2(u) && (m2 += u.includes("[CSS]") ? u.replace("[CSS]", t) : this.getSelectorRule(u, l2, d, t)), m2), "") : C(l2 != null ? l2 : ":root", t);
    }
    if (o) {
      let c2 = { name: "primeui", order: "primeui" };
      i(o) && (c2.name = m(o.name, { name: e, type: s3 })), s2(c2.name) && (t = C(`@layer ${c2.name}`, t), a2 == null || a2.layerNames(c2.name));
    }
    return t;
  }
  return "";
} };
var S = { defaults: { variable: { prefix: "p", selector: ":root", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t } = e;
  t && (this._theme = $(g2({}, t), { options: g2(g2({}, this.defaults.options), t.options) }), this._tokens = b2.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), N.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = $(g2({}, this.theme), { preset: e }), this._tokens = b2.createTokens(e, this.defaults), this.clearLoadedStyleNames(), N.emit("preset:change", e), N.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = $(g2({}, this.theme), { options: e }), this.clearLoadedStyleNames(), N.emit("options:change", e), N.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return b2.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t) {
  return b2.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPresetC(r);
}, getDirective(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPresetD(r);
}, getCustomPreset(e = "", t, r, s3) {
  let i2 = { name: e, preset: t, options: this.options, selector: r, params: s3, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPreset(i2);
}, getLayerOrderCSS(e = "") {
  return b2.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t, r = "style", s3) {
  return b2.transformCSS(e, t, s3, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t, r = {}) {
  return b2.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t, r = {}) {
  return b2.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t), N.emit(`theme:${t}:load`, e), !this._loadingStyles.size && N.emit("theme:load"));
} };

// node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    /* Non vue overlay animations */\n    .p-connected-overlay {\n        opacity: 0;\n        transform: scaleY(0.8);\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-visible {\n        opacity: 1;\n        transform: scaleY(1);\n    }\n\n    .p-connected-overlay-hidden {\n        opacity: 0;\n        transform: scaleY(1);\n        transition: opacity 0.1s linear;\n    }\n\n    /* Vue based overlay animations */\n    .p-connected-overlay-enter-from {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-connected-overlay-leave-to {\n        opacity: 0;\n    }\n\n    .p-connected-overlay-enter-active {\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-leave-active {\n        transition: opacity 0.1s linear;\n    }\n\n    /* Toggleable Content */\n    .p-toggleable-content-enter-from,\n    .p-toggleable-content-leave-to {\n        max-height: 0;\n    }\n\n    .p-toggleable-content-enter-to,\n    .p-toggleable-content-leave-from {\n        max-height: 1000px;\n    }\n\n    .p-toggleable-content-leave-active {\n        overflow: hidden;\n        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n    }\n\n    .p-toggleable-content-enter-active {\n        overflow: hidden;\n        transition: max-height 1s ease-in-out;\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: dt('mask.background');\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter {\n        animation: p-overlay-mask-enter-animation dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave {\n        animation: p-overlay-mask-leave-animation dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-overlay-mask-enter-animation {\n        from {\n            background: transparent;\n        }\n        to {\n            background: dt('mask.background');\n        }\n    }\n    @keyframes p-overlay-mask-leave-animation {\n        from {\n            background: dt('mask.background');\n        }\n        to {\n            background: transparent;\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-usestyle.mjs
var _id = 0;
var _UseStyle = class _UseStyle {
  document = inject(DOCUMENT);
  use(css2, options = {}) {
    let isLoaded = false;
    let cssRef = css2;
    let styleRef = null;
    const {
      immediate = true,
      manual = false,
      name = `style_${++_id}`,
      id = void 0,
      media = void 0,
      nonce = void 0,
      first = false,
      props = {}
    } = options;
    if (!this.document) return;
    styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || id && this.document.getElementById(id) || this.document.createElement("style");
    if (!styleRef.isConnected) {
      cssRef = css2;
      const HEAD = this.document.head;
      Kt(styleRef, "nonce", nonce);
      first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
      A(styleRef, {
        type: "text/css",
        media,
        nonce,
        "data-primeng-style-id": name
      });
    }
    if (styleRef.textContent !== cssRef) {
      styleRef.textContent = cssRef;
    }
    return {
      id,
      name,
      el: styleRef,
      css: cssRef
    };
  }
};
__name(_UseStyle, "UseStyle");
__publicField(_UseStyle, "ɵfac", /* @__PURE__ */ __name(function UseStyle_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UseStyle)();
}, "UseStyle_Factory"));
__publicField(_UseStyle, "ɵprov", ɵɵdefineInjectable({
  token: _UseStyle,
  factory: _UseStyle.ɵfac,
  providedIn: "root"
}));
var UseStyle = _UseStyle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-base.mjs
var css = (
  /*css*/
  `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`
);
var _BaseStyle = class _BaseStyle {
  name = "base";
  useStyle = inject(UseStyle);
  theme = void 0;
  css = void 0;
  classes = {};
  inlineStyles = {};
  load = /* @__PURE__ */ __name((style2, options = {}, transform = (cs) => cs) => {
    const computedStyle = transform(ar`${m(style2, {
      dt: E
    })}`);
    return computedStyle ? this.useStyle.use(G(computedStyle), __spreadValues({
      name: this.name
    }, options)) : {};
  }, "load");
  loadCSS = /* @__PURE__ */ __name((options = {}) => {
    return this.load(this.css, options);
  }, "loadCSS");
  loadTheme = /* @__PURE__ */ __name((options = {}, style2 = "") => {
    return this.load(this.theme, options, (computedStyle = "") => S.transformCSS(options.name || this.name, `${computedStyle}${ar`${style2}`}`));
  }, "loadTheme");
  loadGlobalCSS = /* @__PURE__ */ __name((options = {}) => {
    return this.load(css, options);
  }, "loadGlobalCSS");
  loadGlobalTheme = /* @__PURE__ */ __name((options = {}, style$1 = "") => {
    return this.load(style, options, (computedStyle = "") => S.transformCSS(options.name || this.name, `${computedStyle}${ar`${style$1}`}`));
  }, "loadGlobalTheme");
  getCommonTheme = /* @__PURE__ */ __name((params) => {
    return S.getCommon(this.name, params);
  }, "getCommonTheme");
  getComponentTheme = /* @__PURE__ */ __name((params) => {
    return S.getComponent(this.name, params);
  }, "getComponentTheme");
  getDirectiveTheme = /* @__PURE__ */ __name((params) => {
    return S.getDirective(this.name, params);
  }, "getDirectiveTheme");
  getPresetTheme = /* @__PURE__ */ __name((preset, selector, params) => {
    return S.getCustomPreset(this.name, preset, selector, params);
  }, "getPresetTheme");
  getLayerOrderThemeCSS = /* @__PURE__ */ __name(() => {
    return S.getLayerOrderCSS(this.name);
  }, "getLayerOrderThemeCSS");
  getStyleSheet = /* @__PURE__ */ __name((extendedCSS = "", props = {}) => {
    if (this.css) {
      const _css = m(this.css, {
        dt: E
      });
      const _style = G(ar`${_css}${extendedCSS}`);
      const _props = Object.entries(props).reduce((acc, [k3, v2]) => acc.push(`${k3}="${v2}"`) && acc, []).join(" ");
      return `<style type="text/css" data-primeng-style-id="${this.name}" ${_props}>${_style}</style>`;
    }
    return "";
  }, "getStyleSheet");
  getCommonThemeStyleSheet = /* @__PURE__ */ __name((params, props = {}) => {
    return S.getCommonStyleSheet(this.name, params, props);
  }, "getCommonThemeStyleSheet");
  getThemeStyleSheet = /* @__PURE__ */ __name((params, props = {}) => {
    let css2 = [S.getStyleSheet(this.name, params, props)];
    if (this.theme) {
      const name = this.name === "base" ? "global-style" : `${this.name}-style`;
      const _css = ar`${m(this.theme, {
        dt: E
      })}`;
      const _style = G(S.transformCSS(name, _css));
      const _props = Object.entries(props).reduce((acc, [k3, v2]) => acc.push(`${k3}="${v2}"`) && acc, []).join(" ");
      css2.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
    }
    return css2.join("");
  }, "getThemeStyleSheet");
};
__name(_BaseStyle, "BaseStyle");
__publicField(_BaseStyle, "ɵfac", /* @__PURE__ */ __name(function BaseStyle_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BaseStyle)();
}, "BaseStyle_Factory"));
__publicField(_BaseStyle, "ɵprov", ɵɵdefineInjectable({
  token: _BaseStyle,
  factory: _BaseStyle.ɵfac,
  providedIn: "root"
}));
var BaseStyle = _BaseStyle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-config.mjs
var _ThemeProvider = class _ThemeProvider {
  // @todo define type for theme
  theme = signal(void 0, ...ngDevMode ? [{
    debugName: "theme"
  }] : []);
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : []);
  isThemeChanged = false;
  document = inject(DOCUMENT);
  baseStyle = inject(BaseStyle);
  constructor() {
    effect(() => {
      N.on("theme:change", (newTheme) => {
        untracked(() => {
          this.isThemeChanged = true;
          this.theme.set(newTheme);
        });
      });
    });
    effect(() => {
      const themeValue = this.theme();
      if (this.document && themeValue) {
        if (!this.isThemeChanged) {
          this.onThemeChange(themeValue);
        }
        this.isThemeChanged = false;
      }
    });
  }
  ngOnDestroy() {
    S.clearLoadedStyleNames();
    N.clear();
  }
  onThemeChange(value) {
    S.setTheme(value);
    if (this.document) {
      this.loadCommonTheme();
    }
  }
  loadCommonTheme() {
    if (this.theme() === "none") return;
    if (!S.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style: style2
      } = this.baseStyle.getCommonTheme?.() || {};
      const styleOptions = {
        nonce: this.csp?.()?.nonce
      };
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, styleOptions));
      this.baseStyle.loadGlobalTheme(__spreadValues({
        name: "global-style"
      }, styleOptions), style2);
      S.setLoadedStyleName("common");
    }
  }
  setThemeConfig(config) {
    const {
      theme,
      csp
    } = config || {};
    if (theme) this.theme.set(theme);
    if (csp) this.csp.set(csp);
  }
};
__name(_ThemeProvider, "ThemeProvider");
__publicField(_ThemeProvider, "ɵfac", /* @__PURE__ */ __name(function ThemeProvider_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ThemeProvider)();
}, "ThemeProvider_Factory"));
__publicField(_ThemeProvider, "ɵprov", ɵɵdefineInjectable({
  token: _ThemeProvider,
  factory: _ThemeProvider.ɵfac,
  providedIn: "root"
}));
var ThemeProvider = _ThemeProvider;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _PrimeNG = class _PrimeNG extends ThemeProvider {
  ripple = signal(false, ...ngDevMode ? [{
    debugName: "ripple"
  }] : []);
  platformId = inject(PLATFORM_ID);
  /**
   * @deprecated Since v20. Use `inputVariant` instead.
   */
  inputStyle = signal(null, ...ngDevMode ? [{
    debugName: "inputStyle"
  }] : []);
  inputVariant = signal(null, ...ngDevMode ? [{
    debugName: "inputVariant"
  }] : []);
  overlayAppendTo = signal("self", ...ngDevMode ? [{
    debugName: "overlayAppendTo"
  }] : []);
  overlayOptions = {};
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : []);
  filterMatchModeOptions = {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };
  translation = {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    is: "Is",
    isNot: "Is not",
    before: "Before",
    after: "After",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    completed: "Completed",
    upload: "Upload",
    cancel: "Cancel",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    dateFormat: "mm/dd/yy",
    firstDayOfWeek: 0,
    today: "Today",
    weekHeader: "Wk",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyMessage: "No results found",
    searchMessage: "Search results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyFilterMessage: "No results found",
    fileChosenMessage: "Files",
    noFileChosenMessage: "No file chosen",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      previousPageLabel: "Previous Page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List",
      selectColor: "Select a color",
      removeLabel: "Remove",
      browseFiles: "Browse Files",
      maximizeLabel: "Maximize"
    }
  };
  zIndex = {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  };
  translationSource = new Subject();
  translationObserver = this.translationSource.asObservable();
  getTranslation(key) {
    return this.translation[key];
  }
  setTranslation(value) {
    this.translation = __spreadValues(__spreadValues({}, this.translation), value);
    this.translationSource.next(this.translation);
  }
  setConfig(config) {
    const {
      csp,
      ripple,
      inputStyle,
      inputVariant,
      theme,
      overlayOptions,
      translation,
      filterMatchModeOptions,
      overlayAppendTo,
      zIndex
    } = config || {};
    if (csp) this.csp.set(csp);
    if (overlayAppendTo) this.overlayAppendTo.set(overlayAppendTo);
    if (ripple) this.ripple.set(ripple);
    if (inputStyle) this.inputStyle.set(inputStyle);
    if (inputVariant) this.inputVariant.set(inputVariant);
    if (overlayOptions) this.overlayOptions = overlayOptions;
    if (translation) this.setTranslation(translation);
    if (filterMatchModeOptions) this.filterMatchModeOptions = filterMatchModeOptions;
    if (zIndex) this.zIndex = zIndex;
    if (theme) this.setThemeConfig({
      theme,
      csp
    });
  }
};
__name(_PrimeNG, "PrimeNG");
__publicField(_PrimeNG, "ɵfac", /* @__PURE__ */ (() => {
  let ɵPrimeNG_BaseFactory;
  return /* @__PURE__ */ __name(function PrimeNG_Factory(__ngFactoryType__) {
    return (ɵPrimeNG_BaseFactory || (ɵPrimeNG_BaseFactory = ɵɵgetInheritedFactory(_PrimeNG)))(__ngFactoryType__ || _PrimeNG);
  }, "PrimeNG_Factory");
})());
__publicField(_PrimeNG, "ɵprov", ɵɵdefineInjectable({
  token: _PrimeNG,
  factory: _PrimeNG.ɵfac,
  providedIn: "root"
}));
var PrimeNG = _PrimeNG;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeNG, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PRIME_NG_CONFIG = new InjectionToken("PRIME_NG_CONFIG");
function providePrimeNG(...features) {
  const providers = features?.map((feature) => ({
    provide: PRIME_NG_CONFIG,
    useValue: feature,
    multi: false
  }));
  const initializer = provideAppInitializer(() => {
    const PrimeNGConfig = inject(PrimeNG);
    features?.forEach((feature) => PrimeNGConfig.setConfig(feature));
    return;
  });
  return makeEnvironmentProviders([...providers, initializer]);
}
__name(providePrimeNG, "providePrimeNG");
export {
  PRIME_NG_CONFIG,
  PrimeNG,
  ThemeProvider,
  providePrimeNG
};
//# sourceMappingURL=primeng_config.js.map
