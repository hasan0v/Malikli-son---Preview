module.exports = {

"[project]/src/components/ProtectedRoute.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProtectedRoute)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProtectedRoute({ children, redirectTo = '/auth/login' }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const { isAuthenticated, isLoading, isInitialized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.auth);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Redirect if not authenticated after initialization is complete
        if (isInitialized && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [
        isInitialized,
        isAuthenticated,
        router,
        redirectTo
    ]);
    // Show loading while checking authentication or while API is loading
    if (!isInitialized || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '1rem'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f4f6',
                        borderTop: '4px solid #6366f1',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ProtectedRoute.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: '#6b7280'
                    },
                    children: !isInitialized ? t('common.initializing') || 'Initializing...' : t('common.checkingAuth')
                }, void 0, false, {
                    fileName: "[project]/src/components/ProtectedRoute.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProtectedRoute.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    // Don't render children if not authenticated
    if (!isAuthenticated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}}),
"[project]/src/components/LoadingCircle.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "bounce1": "LoadingCircle-module__d_8MDa__bounce1",
  "bounce2": "LoadingCircle-module__d_8MDa__bounce2",
  "bounce3": "LoadingCircle-module__d_8MDa__bounce3",
  "cardSkeleton": "LoadingCircle-module__d_8MDa__cardSkeleton",
  "circleSpinner": "LoadingCircle-module__d_8MDa__circleSpinner",
  "fullPageOverlay": "LoadingCircle-module__d_8MDa__fullPageOverlay",
  "gray": "LoadingCircle-module__d_8MDa__gray",
  "large": "LoadingCircle-module__d_8MDa__large",
  "loading": "LoadingCircle-module__d_8MDa__loading",
  "loadingContainer": "LoadingCircle-module__d_8MDa__loadingContainer",
  "loadingText": "LoadingCircle-module__d_8MDa__loadingText",
  "medium": "LoadingCircle-module__d_8MDa__medium",
  "primary": "LoadingCircle-module__d_8MDa__primary",
  "productCardSkeleton": "LoadingCircle-module__d_8MDa__productCardSkeleton",
  "productGridLoading": "LoadingCircle-module__d_8MDa__productGridLoading",
  "sectionLoading": "LoadingCircle-module__d_8MDa__sectionLoading",
  "sk-bouncedelay": "LoadingCircle-module__d_8MDa__sk-bouncedelay",
  "small": "LoadingCircle-module__d_8MDa__small",
  "spin": "LoadingCircle-module__d_8MDa__spin",
  "spinner": "LoadingCircle-module__d_8MDa__spinner",
  "white": "LoadingCircle-module__d_8MDa__white",
});
}}),
"[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.module.css [app-ssr] (css module)");
"use client";
;
;
const LoadingCircle = ({ size = 'medium', color = 'primary', text, className = '' })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingContainer} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].spinner} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][size]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][color]}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce1
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce2
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce3
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LoadingCircle.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingText,
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/LoadingCircle.tsx",
                lineNumber: 26,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoadingCircle.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LoadingCircle;
}}),
"[project]/src/app/profile/profile.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "actionButtons": "profile-module__5FeCNW__actionButtons",
  "avatar": "profile-module__5FeCNW__avatar",
  "avatarSection": "profile-module__5FeCNW__avatarSection",
  "button": "profile-module__5FeCNW__button",
  "editButton": "profile-module__5FeCNW__editButton",
  "formGrid": "profile-module__5FeCNW__formGrid",
  "formGroup": "profile-module__5FeCNW__formGroup",
  "formInput": "profile-module__5FeCNW__formInput",
  "formLabel": "profile-module__5FeCNW__formLabel",
  "formValue": "profile-module__5FeCNW__formValue",
  "loadingSpinner": "profile-module__5FeCNW__loadingSpinner",
  "logoutButton": "profile-module__5FeCNW__logoutButton",
  "ordersPlaceholder": "profile-module__5FeCNW__ordersPlaceholder",
  "placeholderText": "profile-module__5FeCNW__placeholderText",
  "primaryButton": "profile-module__5FeCNW__primaryButton",
  "profileCard": "profile-module__5FeCNW__profileCard",
  "profileContainer": "profile-module__5FeCNW__profileContainer",
  "profileContent": "profile-module__5FeCNW__profileContent",
  "profileHeader": "profile-module__5FeCNW__profileHeader",
  "saveActions": "profile-module__5FeCNW__saveActions",
  "saveButton": "profile-module__5FeCNW__saveButton",
  "secondaryButton": "profile-module__5FeCNW__secondaryButton",
  "section": "profile-module__5FeCNW__section",
  "sectionTitle": "profile-module__5FeCNW__sectionTitle",
  "settingDescription": "profile-module__5FeCNW__settingDescription",
  "settingInfo": "profile-module__5FeCNW__settingInfo",
  "settingItem": "profile-module__5FeCNW__settingItem",
  "settingsGrid": "profile-module__5FeCNW__settingsGrid",
  "spin": "profile-module__5FeCNW__spin",
  "spinner": "profile-module__5FeCNW__spinner",
  "userEmail": "profile-module__5FeCNW__userEmail",
  "userInfo": "profile-module__5FeCNW__userInfo",
});
}}),
"[project]/src/app/profile/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProfilePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProtectedRoute.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/profile/profile.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
;
;
function ProfileContent() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isLoading, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.auth);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUserProfile"])());
        } else {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone_number || ''
            });
        }
    }, [
        dispatch,
        user
    ]);
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSave = async ()=>{
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/api/v1/auth/profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUserProfile"])());
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const handleLogout = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])());
        router.push('/');
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    size: "large",
                    color: "primary",
                    text: t('profile.loading')
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileCard,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileHeader,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatarSection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatar,
                                    children: user.first_name ? user.first_name[0].toUpperCase() : 'П'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userName,
                                            children: [
                                                user.first_name,
                                                " ",
                                                user.last_name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userEmail,
                                            children: user.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionButtons,
                            children: [
                                "            ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsEditing(!isEditing),
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editButton}`,
                                    children: isEditing ? t('profile.cancel') : t('profile.edit')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 61
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoutButton}`,
                                    children: t('profile.logout')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileContent,
                    children: [
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: t('profile.personalInfo.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGrid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                    children: t('profile.personalInfo.firstName')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "first_name",
                                                    value: formData.first_name,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formValue,
                                                    children: user.first_name || t('profile.notSpecified')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                    children: t('profile.personalInfo.lastName')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, this),
                                                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "last_name",
                                                    value: formData.last_name,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formValue,
                                                    children: user.last_name || t('profile.notSpecified')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                    children: t('profile.personalInfo.email')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this),
                                                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    name: "email",
                                                    value: formData.email,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formValue,
                                                    children: user.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                    children: t('profile.personalInfo.phone')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 17
                                                }, this),
                                                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    name: "phone",
                                                    value: formData.phone,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formInput,
                                                    placeholder: t('profile.personalInfo.phonePlaceholder')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formValue,
                                                    children: user.phone_number || t('profile.notSpecified')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                "            ",
                                isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].saveActions,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].saveButton}`,
                                        children: t('profile.saveChanges')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/page.tsx",
                            lineNumber: 110,
                            columnNumber: 58
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: t('profile.accountSettings.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingsGrid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingItem,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingInfo,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingTitle,
                                                            children: t('profile.accountSettings.changePassword.title')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/profile/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingDescription,
                                                            children: t('profile.accountSettings.changePassword.description')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/profile/page.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton}`,
                                                    children: t('profile.accountSettings.changePassword.button')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingItem,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingInfo,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingTitle,
                                                            children: t('profile.accountSettings.notifications.title')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/profile/page.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settingDescription,
                                                            children: t('profile.accountSettings.notifications.description')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/profile/page.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton}`,
                                                    children: t('profile.accountSettings.notifications.button')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: t('profile.orders.title')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ordersPlaceholder,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].placeholderText,
                                            children: t('profile.orders.noOrders')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$profile$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primaryButton}`,
                                            children: t('profile.orders.startShopping')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/profile/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/page.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/profile/page.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function ProfilePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileContent, {}, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 230,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_16ea908f._.js.map