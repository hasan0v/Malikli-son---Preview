(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/auth/auth.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "authCard": "auth-module__Y2OPrW__authCard",
  "authContainer": "auth-module__Y2OPrW__authContainer",
  "authFooter": "auth-module__Y2OPrW__authFooter",
  "authForm": "auth-module__Y2OPrW__authForm",
  "authHeader": "auth-module__Y2OPrW__authHeader",
  "authSubtitle": "auth-module__Y2OPrW__authSubtitle",
  "authTitle": "auth-module__Y2OPrW__authTitle",
  "cancelButton": "auth-module__Y2OPrW__cancelButton",
  "checkbox": "auth-module__Y2OPrW__checkbox",
  "checkboxCustom": "auth-module__Y2OPrW__checkboxCustom",
  "checkboxGroup": "auth-module__Y2OPrW__checkboxGroup",
  "checkboxLabel": "auth-module__Y2OPrW__checkboxLabel",
  "dividerText": "auth-module__Y2OPrW__dividerText",
  "errorMessage": "auth-module__Y2OPrW__errorMessage",
  "footerLink": "auth-module__Y2OPrW__footerLink",
  "footerText": "auth-module__Y2OPrW__footerText",
  "forgotLink": "auth-module__Y2OPrW__forgotLink",
  "formRow": "auth-module__Y2OPrW__formRow",
  "helpText": "auth-module__Y2OPrW__helpText",
  "input": "auth-module__Y2OPrW__input",
  "inputGroup": "auth-module__Y2OPrW__inputGroup",
  "inputIcon": "auth-module__Y2OPrW__inputIcon",
  "inputLabel": "auth-module__Y2OPrW__inputLabel",
  "inputWrapper": "auth-module__Y2OPrW__inputWrapper",
  "linkButton": "auth-module__Y2OPrW__linkButton",
  "loading": "auth-module__Y2OPrW__loading",
  "passwordToggle": "auth-module__Y2OPrW__passwordToggle",
  "proceedButton": "auth-module__Y2OPrW__proceedButton",
  "redirectActions": "auth-module__Y2OPrW__redirectActions",
  "redirectInfo": "auth-module__Y2OPrW__redirectInfo",
  "socialButton": "auth-module__Y2OPrW__socialButton",
  "socialButtons": "auth-module__Y2OPrW__socialButtons",
  "socialDivider": "auth-module__Y2OPrW__socialDivider",
  "spin": "auth-module__Y2OPrW__spin",
  "spinner": "auth-module__Y2OPrW__spinner",
  "submitButton": "auth-module__Y2OPrW__submitButton",
  "successIcon": "auth-module__Y2OPrW__successIcon",
  "successMessage": "auth-module__Y2OPrW__successMessage",
});
}}),
"[project]/src/app/auth/reset-password/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ResetPasswordPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/auth/auth.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ResetPasswordPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const { isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "ResetPasswordPage.useAppSelector": (state)=>state.auth
    }["ResetPasswordPage.useAppSelector"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResetPasswordPage.useEffect": ()=>{
            const urlToken = searchParams?.get('token');
            if (!urlToken) {
                router.push('/auth/forgot-password');
            } else {
                setToken(urlToken);
            }
        }
    }["ResetPasswordPage.useEffect"], [
        searchParams,
        router
    ]);
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = t('auth.resetPassword.validation.passwordRequired');
        } else if (formData.password.length < 8) {
            newErrors.password = t('auth.resetPassword.validation.passwordLength');
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('auth.resetPassword.validation.confirmPasswordRequired');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('auth.resetPassword.validation.passwordMismatch');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm() || !token) return;
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/password-reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    password: formData.password,
                    password2: formData.confirmPassword
                })
            });
            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setErrors(errorData);
            }
        } catch (error) {
            setErrors({
                general: t('common.error')
            });
        }
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };
    if (!token) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authCard,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authTitle,
                                children: t('auth.resetPassword.invalidLinkTitle')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authSubtitle,
                                children: t('auth.resetPassword.invalidLinkMessage')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authFooter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/auth/forgot-password",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkButton,
                            children: t('auth.resetPassword.requestNewLink')
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/auth/reset-password/page.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this);
    }
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authCard,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authTitle,
                                children: t('auth.resetPassword.successTitle')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authSubtitle,
                                children: t('auth.resetPassword.successMessage')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successMessage,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successIcon,
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: t('auth.resetPassword.successMessage')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authFooter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/auth/login",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkButton,
                            children: t('auth.resetPassword.backToLogin')
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/auth/reset-password/page.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authCard,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authHeader,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authTitle,
                            children: t('auth.resetPassword.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authSubtitle,
                            children: t('auth.resetPassword.subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authForm,
                    children: [
                        errors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                            children: errors.general
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formLabel,
                                    children: t('auth.resetPassword.password')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordWrapper,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showPassword ? 'text' : 'password',
                                            id: "password",
                                            name: "password",
                                            value: formData.password,
                                            onChange: handleInputChange,
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput} ${errors.password ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                            placeholder: t('auth.resetPassword.passwordPlaceholder'),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordToggle,
                                            onClick: ()=>setShowPassword(!showPassword),
                                            children: showPassword ? '🙈' : '👁️'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                    children: errors.password
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "confirmPassword",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formLabel,
                                    children: t('auth.resetPassword.confirmPassword')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordWrapper,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showConfirmPassword ? 'text' : 'password',
                                            id: "confirmPassword",
                                            name: "confirmPassword",
                                            value: formData.confirmPassword,
                                            onChange: handleInputChange,
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput} ${errors.confirmPassword ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                            placeholder: t('auth.resetPassword.confirmPasswordPlaceholder'),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordToggle,
                                            onClick: ()=>setShowConfirmPassword(!showConfirmPassword),
                                            children: showConfirmPassword ? '🙈' : '👁️'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                    children: errors.confirmPassword
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton}`,
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, this),
                                    t('auth.resetPassword.resetButtonLoading')
                                ]
                            }, void 0, true) : t('auth.resetPassword.resetButton')
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/reset-password/page.tsx",
                            lineNumber: 199,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authFooter,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            t('auth.forgotPassword.rememberedPassword'),
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth/login",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$auth$2f$auth$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authLink,
                                children: t('auth.resetPassword.backToLogin')
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/reset-password/page.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/reset-password/page.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/reset-password/page.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/auth/reset-password/page.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auth/reset-password/page.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(ResetPasswordPage, "l5N6qVIIYMz7EX7Cu36h4UXxpTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"]
    ];
});
_c = ResetPasswordPage;
var _c;
__turbopack_context__.k.register(_c, "ResetPasswordPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_auth_0fc63467._.js.map