function checkDateRange(n, t, i, r) {
    var e = n.data("kendoDatePicker") || n.data("kendoDateTimePicker") || n.data("tDatePicker") || n.data("tDateTimePicker"),
        o = t.data("kendoDatePicker") || t.data("kendoDateTimePicker") || t.data("tDatePicker") || t.data("tDateTimePicker"),
        u = e.value() || 0,
        f = o.value() || 0,
        s = r * 864e5 - (f - u);
    return (!i || (u > 0 && f > 0)) && u <= f && s >= 0;
}
function htmlEncode(n) {
    return $("<div/>").text(n).html();
}
function htmlDecode(n) {
    return $("<div/>").html(n).text();
}
function isGuid(n) {
    return n.match(/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i);
}
function safeString(n) {
    return n ? n.replace(/\'/g, "\\'") : n;
}
function htmlEscape(n) {
    return String(n).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function simpleJsonToForm(n, t) {
    t ? (t += "_") : (t = "");
    $.each(n, function (n, i) {
        if (n != "") {
            var r = $("#" + t + n);
            r.val(i.replace("@@@@", "\n"));
        }
    });
}
function addDays(n, t) {
    return new Date(n.getTime() + t * 864e5);
}
function addMonths(n, t) {
    var i = new Date(n);
    return i.setMonth(i.getMonth() + t);
}
function getAge(n) {
    var t = new Date(),
        i = new Date(n),
        r = t.getFullYear() - i.getFullYear(),
        u = t.getMonth() - i.getMonth();
    return (u < 0 || (u === 0 && t.getDate() < i.getDate())) && r--, r;
}
function formatIDCardNoField_Res(n) {
    var i = $(n),
        t;
    i.val(i.val().replace(/\s/g, ""));
    t = i.val();
    t !== "" && ((t = t.toUpperCase()), i.val(t));
    /^\d+[Aa]$/.test(t) && t.length < 9 && i.val($.strPad(t, 8));
    $(i[0].form).validate().element(i);
}
function formatIDCardNoField_All(n) {
    var t = $(n),
        i = t.val();
    /^\d+[mMlLgGhHpPAa]$/.test(i) && i.length < 9 && (t.val($.strPad(i, 8).toUpperCase()), $(t[0].form).validate().element(t));
}
function dismissCookieNotice() {
    setCookie("cookienotice_sp", "dismiss", 365);
    $("#cookienotice").hide();
}
var notify, isAjaxActive, NoDiacritics;
{
    function displayMessages(n, t) {
        var i = null,
            u,
            f,
            e,
            o,
            s,
            h,
            r;
        t
            ? ((u = typeof t == "string" ? $("#" + t).find("[data-valmsg-summary=true], .messages-container") : $(t).find("[data-valmsg-summary=true], .messages-container")), u.length > 0 && (i = u))
            : ((u = $("form:visible").find("[data-valmsg-summary=true]").first()), u.length > 0 && (i = u));
        i == null && (i = $("#validation-container"));
        i.length > 0
            ? ((f = "alert"),
              i.hide(),
              (e = i.find("ul.alert-danger")),
              e.length == 0 && (e = $('<ul class="' + f + ' alert-danger" style="display:none;white-space:pre-line;"></ul>').appendTo(i)),
              (o = i.find("ul.alert-warning")),
              o.length == 0 && (o = $('<ul class="' + f + ' alert-warning" style="display:none;"></ul>').appendTo(i)),
              (s = i.find("ul.alert-info")),
              s.length == 0 && (s = $('<ul class="' + f + ' alert-info" style="display:none;"></ul>').appendTo(i)),
              (h = i.find("ul.alert-success")),
              h.length == 0 && (h = $('<ul class="' + f + ' alert-success" style="display:none;"></ul>').appendTo(i)),
              (r = i.find("ul")),
              r.empty(),
              r.hide(),
              r.prepend('<span class="close" data-dismiss="alert">&times;</span>'),
              n && n.length
                  ? $.each(n, function () {
                        switch (this.Key) {
                            case "MODELERRORKEY_WARNING":
                                r = o;
                                break;
                            case "MODELERRORKEY_INFO":
                                r = s;
                                break;
                            case "MODELERRORKEY_SUCCESS":
                                r = h;
                                break;
                            case "MODELERRORKEY_ERROR":
                            case "MODELERRORKEY_EXCEPTION":
                            default:
                                r = e;
                        }
                        if ((this.Key && inputHighlight("#" + this.Key), this.Value)) {
                            for (var n = 0; n < this.Value.length; n++) $("<li />").html(this.Value[n]).appendTo(r);
                            r.show();
                        } else alert("A critical server error occured - please contact administrator");
                    })
                  : e.show(),
              i.removeClass("validation-summary-valid"),
              i.show("fast"),
              setTimeout(function () {
                  var n = i.offset().top;
                  n < $(window).scrollTop() && $(window).scrollTop(n);
              }, 250))
            : alert(n[0].Value[0]);
    }
    function hideErrors(n) {
        var i = null,
            t;
        typeof n == "string"
            ? ((t = $("#" + n).find("[data-valmsg-summary=true], .messages-container")), t.length > 0 && (i = t))
            : n
            ? ((t = $(n).find("[data-valmsg-summary=true], .messages-container")), t.length > 0 && (i = t))
            : ((t = $("form:visible").find("[data-valmsg-summary=true]").first()), t.length > 0 && (i = t));
        i == null && (i = $("#validation-container"));
        i.length > 0 && i.hide();
    }
    function inputHighlight(n, t, i) {
        t == undefined && (t = "has-error");
        i == undefined && (i = "has-success");
        var r = !$(n).attr("readonly") && !$(n).attr("disabled");
        $(n).closest(".form-group").removeClass(i).addClass(t);
    }
    function inputUnhighlight(n, t, i) {
        t == undefined && (t = "has-error");
        i == undefined && (i = "has-success");
        $(n).closest(".form-group").removeClass(t).addClass(i);
    }
    notify = function (n, t) {
        var f = jQuery("#notifications"),
            u;
        if (f.length > 0) {
            var i = jQuery.extend({}, notify.defaults, t),
                e = i.closeButton ? '<span class="close-bt"></span>' : "",
                r = jQuery("#notifications")
                    .append("<li>" + n + e + "</li>")
                    .children(":last-child");
            r.expand();
            i.autoClose &&
                ((u = setTimeout(function () {
                    r.fadeAndRemove();
                }, i.closeDelay)),
                r.hover(
                    function () {
                        clearTimeout(u);
                    },
                    function () {
                        u = setTimeout(function () {
                            r.fadeAndRemove();
                        }, i.closeDelay);
                    }
                ));
        } else
            setTimeout(function () {
                notify(n, t);
            }, 40);
    };
    notify.defaults = { closeButton: !0, autoClose: !0, closeDelay: 8e3 };
    function showMessageAndRedirect(n, t, i, r, u, f) {
        var e, o;
        t || (t = "Your request has been completed successfully");
        r || (r = "If your browser does not automatically redirect you in a few seconds, click Close to continue.");
        u || (u = "Close");
        f === undefined && (f = 5e3);
        e = $("#RedirectMsgBox");
        e.length == 0 &&
            (e = $(
                '<div style="display: none; cursor:default;" id="RedirectMsgBox" class="modal-dialog modal-lg k-widget k-window k-dialog"><div class="k-window-titlebar k-dialog-titlebar k-header">&nbsp;<span class="k-window-title k-dialog-title"></span><div class="k-window-actions"><a class="k-window-action k-link" href="#"><span class="k-icon k-i-close"></span></a></div></div><div class="k-window-content k-content" style="text-align:center;"><div id="RedirectMsgBox_message" style="padding-top:0.5em;font-size:1.5em;color:#003399"></div><div id="RedirectMsgBox_help" style="padding-top:1.5em;"></div><div id="RedirectMsgBox_close" style="padding-top:2.5em;"><a href="#" class="btn btn-primary btn-sm"></a></div></div></div>'
            ));
        e.find("span.k-window-title").text(i);
        e.find("#RedirectMsgBox_message").text(t);
        e.find("#RedirectMsgBox_help").text(r);
        o = function () {
            forceRedirect(n);
        };
        e.find("span.k-i-close,#RedirectMsgBox_close a").unbind("click").click(o).text(u);
        isAjaxActive
            ? $(document).ajaxStop(function () {
                  $.blockUI({ fadeIn: 0, fadeOut: 0, css: { top: "10%", left: "50%", width: "80%", marginLeft: "-40%" }, message: e });
              })
            : $.blockUI({ fadeIn: 0, fadeOut: 0, css: { top: "10%", left: "50%", width: "80%", marginLeft: "-40%" }, message: e });
        f && setTimeout(o, f);
    }
    function validateForm(n) {
        var t = n.kendoValidator().data("kendoValidator");
        return (
            t.validate(),
            n.valid()
                ? (n.find("div.control-group").each(function () {
                      n.find("span.field-validation-error").length == 0 && (n.removeClass("has-error"), n.addClass("has-success"));
                  }),
                  !0)
                : (n.find("div.control-group").each(function () {
                      n.find("span.field-validation-error").length > 0 && (n.removeClass("has-success"), n.addClass("has-error"));
                  }),
                  !1)
        );
    }
    $(document).ready(function () {
        function t(n) {
            var t = $(n.target);
            t.siblings("span.k-dropdown-wrap").add(t.siblings("div.k-multiselect-wrap")).add(t.parent("span.k-numeric-wrap")).add(t.parent("span.k-picker-wrap")).toggleClass("k-invalid", t.hasClass("k-invalid"));
        }
        var r, u;
        $('<ul id="notifications"></ul>').appendTo($("#content-container"));
        $("form").each(function () {
            $(this).unbind("invalid-form.validate");
            $(this).bind("invalid-form.validate", function (n, t) {
                if ((hideErrors(n.currentTarget), t.errorList.length)) {
                    var i = [];
                    $.each(t.errorList, function () {
                        i.push({ Key: "", Value: [this.message] });
                    });
                    displayMessages(i, n.currentTarget);
                }
            });
        });
        $("form :input").change(function () {
            $("form").data("changed", !0);
        });
        $(".validation-summary-errors").each(function () {
            $(this).children("ul").addClass("alert");
            $(this).children("ul").addClass("alert-danger");
        });
        $("form").submit(function () {
            validateForm($(this));
        });
        $("form").each(function () {
            $(this)
                .find("div.form-group")
                .each(function () {
                    $(this).find("span.field-validation-error").length > 0 && $(this).addClass("has-error");
                });
        });
        $.blockUI &&
            (($.blockUI.defaults.fadeIn = 5e3),
            ($.blockUI.defaults.fadeOut = 0),
            ($.blockUI.defaults.message = $("#blockUI-loading")),
            ($.blockUI.defaults.baseZ = 999951),
            ($.blockUI.defaults.css.border = "none"),
            ($.blockUI.defaults.css.backgroundColor = "transparent"),
            $("form:not(.no-block-on-submit)").submit(function () {
                $(this).valid() && $.blockUI();
            }),
            $(document).ajaxStart(ajaxStarted).ajaxStop(ajaxStopped));
        $("form:not(.allow-submit-on-enter)").keypress(function (n) {
            if (n.keyCode == 13 && !$(n.target).is("textarea,.allow-submit-on-enter")) return n.preventDefault(), !1;
        });
        $('form:not(.allow-submit-on-enter) input:not([type="submit"], .allow-submit-on-enter)').keypress(function (n) {
            if (n.keyCode == 13) {
                var t = $(this).parents("form").eq(0).find(":input");
                return t[t.index(this) + 1] != null && t[t.index(this) + 1].focus(), n.preventDefault(), !1;
            }
        });
        $(".show-confirm").bind("click", function (n) {
            n.preventDefault();
            n.stopPropagation();
            $(this.form).confirmBox({ triggerButton: $(this) });
        });
        var n = $("form").find("[data-role=combobox],[data-role=dropdownlist],[data-role=numerictextbox],[data-role^=date],[data-role=multiselect]"),
            f = "MutationEvent" in window,
            i = window.WebKitMutationObserver || window.MutationObserver;
        i
            ? ((r = new i(function (n) {
                  for (var i = 0, r, u = n.length; i < u; i++) (r = n[i]), r.attributeName === "class" && t(r);
              })),
              (u = { attributes: !0, childList: !1, characterData: !1 }),
              n.each(function () {
                  r.observe(this, u);
              }))
            : f
            ? n.bind("DOMAttrModified", t)
            : n.each(function () {
                  this.attachEvent("onpropertychange", t);
              });
    });
}
{
    function forceRedirect(n, t) {
        window.onbeforeunload = null;
        window.setTimeout(
            function () {
                $.blockUI && $.blockUI();
                window.location.href = n;
            },
            t ? t : 0
        );
    }
    function handleAjaxSuccessNew(n, t, i) {
        var r = handleAjaxSuccess();
        r(n, t, i);
    }
    function handleAjaxSuccess(n) {
        return function (t, i, r) {
            var f = r.getResponseHeader("Content-Type"),
                u;
            if (!/javascript/.test(f) || r.responseText == "") {
                if (/text\/html/.test(f) && !r.getResponseHeader("EXG-SID") && ((u = r.responseText.match(/Your support ID is: ([0-9]+)/i)), u)) {
                    displayError(
                        "Request Rejected. Support ID: " +
                            u[1] +
                            '.<br/><br/>This can happen if unexpected characters are detected in your request - e.g. " ; | [ % &lt; ...<br/>If this occurs while uploading files, try and upload them in a different format (pdf, docx, jpg).'
                    );
                    return;
                }
                if (n !== undefined && typeof n == "function") return n(t, i, r);
            }
        };
    }
    function handleAjaxError(xhr) {
        var contentType = xhr.getResponseHeader("content-type"),
            supportIDCheck;
        if (/javascript/.test(contentType) && xhr.responseText != "") eval(xhr.responseText);
        else {
            if (/text\/html/.test(contentType) && !xhr.getResponseHeader("EXG-SID") && ((supportIDCheck = xhr.responseText.match(/Your support ID is: ([0-9]+)/i)), supportIDCheck)) {
                displayError(
                    "Request Rejected. Support ID: " +
                        supportIDCheck[1] +
                        '.<br/><br/>This can happen if unexpected characters are detected in your request - e.g. " ; | [ % &lt; ...<br/>If this occurs while uploading files, try and upload them in a different format (pdf, docx, jpg).'
                );
                return;
            }
            displayError("An error was encountered while processing your request.");
        }
    }
    function displaySuccess(n, t) {
        return displayError(n, t, "MODELERRORKEY_SUCCESS");
    }
    function displayInfo(n, t) {
        return displayError(n, t, "MODELERRORKEY_INFO");
    }
    function displayWarning(n, t) {
        return displayError(n, t, "MODELERRORKEY_WARNING");
    }
    function displayError(n, t, i) {
        return displayMessages([{ Key: i ? i : "", Value: $.isArray(n) ? n : [n] }], t);
    }
    function enableInputs(n, t) {
        $(n)
            .find(":input")
            .each(function () {
                var n = $(this),
                    i;
                if (!t || !n.is(t))
                    if ((i = n.data("kendoDatePicker")) || (i = n.data("kendoDropDownList")) || (i = n.data("kendoComboBox"))) i.enable(!0);
                    else {
                        if (this.localName == "button" || this.type == "submit" || this.type == "button" || this.type == "hidden") return;
                        this.type == "radio" || this.type == "checkbox" ? ($(this).removeAttr("disabled"), n.parent().hasClass("button") && n.parent().removeClass("disabled")) : $(this).removeAttr("readonly");
                    }
            });
    }
    function disableInputs(n, t) {
        $(n)
            .find(":input")
            .each(function () {
                var n = $(this),
                    i;
                if (!t || !n.is(t))
                    if ((i = n.data("kendoDatePicker")) || (i = n.data("kendoDropDownList")) || (i = n.data("kendoComboBox"))) i.enable(!1);
                    else {
                        if (this.localName == "button" || this.type == "submit" || this.type == "button" || this.type == "hidden") return;
                        this.type == "radio" || this.type == "checkbox"
                            ? (n.attr("disabled", "disabled"), n.parent().hasClass("button") && n.parent().addClass("disabled"))
                            : this.type.indexOf("select") == 0
                            ? n.attr("disabled", "disabled")
                            : n.attr("readonly", "readonly");
                    }
            });
    }
    function clearInputs(n) {
        $(n)
            .find(":input")
            .each(function () {
                var t = $(this),
                    n;
                if (!t.hasClass("keepfilter"))
                    if ((n = t.data("kendoDatePicker"))) n.value("");
                    else if ((n = t.data("kendoDropDownList"))) n.select(0);
                    else if ((n = t.data("kendoComboBox"))) n.text("");
                    else {
                        if (this.localName == "button" || this.type == "submit" || this.type == "button" || this.type == "hidden") return;
                        this.type == "checkbox" || this.type == "radio" ? t.prop("checked", !1) : $(this).val("");
                    }
            });
    }
    $.fn.fullscreenImg = function () {
        $(this)
            .css({ cursor: "pointer" })
            .on("click", function (n) {
                n.preventDefault();
                var t = $(this),
                    i = $("<img />").css({ "max-width": "100%", "max-height": "100%", display: "inline" });
                i.attr({ src: t.attr("src") || t.attr("href"), alt: t.attr("alt"), title: t.attr("title") });
                $("<div />")
                    .text(" ")
                    .css({
                        height: "100%",
                        width: "100%",
                        background: "rgba(0,0,0,.82)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer",
                        "z-index": 9999,
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                    })
                    .append(i)
                    .bind("click", function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    })
                    .insertAfter(this)
                    .animate({ opacity: 1 }, 300);
            });
    };
    isAjaxActive = !1;
    function ajaxStarted() {
        $.blockUI && $.blockUI();
        isAjaxActive = !0;
    }
    function ajaxStopped() {
        $.blockUI && $.unblockUI();
        isAjaxActive = !1;
    }
    $(window).on("load", function () {
        $(".show-on-load").show();
    });
}
NoDiacritics = {};
NoDiacritics.map = {
    Á: "A",
    Ă: "A",
    Ắ: "A",
    Ặ: "A",
    Ằ: "A",
    Ẳ: "A",
    Ẵ: "A",
    Ǎ: "A",
    Â: "A",
    Ấ: "A",
    Ậ: "A",
    Ầ: "A",
    Ẩ: "A",
    Ẫ: "A",
    Ä: "A",
    Ǟ: "A",
    Ȧ: "A",
    Ǡ: "A",
    Ạ: "A",
    Ȁ: "A",
    À: "A",
    Ả: "A",
    Ȃ: "A",
    Ā: "A",
    Ą: "A",
    Å: "A",
    Ǻ: "A",
    Ḁ: "A",
    Ⱥ: "A",
    Ã: "A",
    Ꜳ: "AA",
    Æ: "AE",
    Ǽ: "AE",
    Ǣ: "AE",
    Ꜵ: "AO",
    Ꜷ: "AU",
    Ꜹ: "AV",
    Ꜻ: "AV",
    Ꜽ: "AY",
    Ḃ: "B",
    Ḅ: "B",
    Ɓ: "B",
    Ḇ: "B",
    Ƀ: "B",
    Ƃ: "B",
    Ć: "C",
    Č: "C",
    Ç: "C",
    Ḉ: "C",
    Ĉ: "C",
    Ċ: "C",
    Ƈ: "C",
    Ȼ: "C",
    Ď: "D",
    Ḑ: "D",
    Ḓ: "D",
    Ḋ: "D",
    Ḍ: "D",
    Ɗ: "D",
    Ḏ: "D",
    ǲ: "D",
    ǅ: "D",
    Đ: "D",
    Ƌ: "D",
    Ǳ: "DZ",
    Ǆ: "DZ",
    É: "E",
    Ĕ: "E",
    Ě: "E",
    Ȩ: "E",
    Ḝ: "E",
    Ê: "E",
    Ế: "E",
    Ệ: "E",
    Ề: "E",
    Ể: "E",
    Ễ: "E",
    Ḙ: "E",
    Ë: "E",
    Ė: "E",
    Ẹ: "E",
    Ȅ: "E",
    È: "E",
    Ẻ: "E",
    Ȇ: "E",
    Ē: "E",
    Ḗ: "E",
    Ḕ: "E",
    Ę: "E",
    Ɇ: "E",
    Ẽ: "E",
    Ḛ: "E",
    Ꝫ: "ET",
    Ḟ: "F",
    Ƒ: "F",
    Ǵ: "G",
    Ğ: "G",
    Ǧ: "G",
    Ģ: "G",
    Ĝ: "G",
    Ġ: "G",
    Ɠ: "G",
    Ḡ: "G",
    Ǥ: "G",
    Ḫ: "H",
    Ȟ: "H",
    Ḩ: "H",
    Ĥ: "H",
    Ⱨ: "H",
    Ḧ: "H",
    Ḣ: "H",
    Ḥ: "H",
    Ħ: "H",
    Í: "I",
    Ĭ: "I",
    Ǐ: "I",
    Î: "I",
    Ï: "I",
    Ḯ: "I",
    İ: "I",
    Ị: "I",
    Ȉ: "I",
    Ì: "I",
    Ỉ: "I",
    Ȋ: "I",
    Ī: "I",
    Į: "I",
    Ɨ: "I",
    Ĩ: "I",
    Ḭ: "I",
    Ꝺ: "D",
    Ꝼ: "F",
    Ᵹ: "G",
    Ꞃ: "R",
    Ꞅ: "S",
    Ꞇ: "T",
    Ꝭ: "IS",
    Ĵ: "J",
    Ɉ: "J",
    Ḱ: "K",
    Ǩ: "K",
    Ķ: "K",
    Ⱪ: "K",
    Ꝃ: "K",
    Ḳ: "K",
    Ƙ: "K",
    Ḵ: "K",
    Ꝁ: "K",
    Ꝅ: "K",
    Ĺ: "L",
    Ƚ: "L",
    Ľ: "L",
    Ļ: "L",
    Ḽ: "L",
    Ḷ: "L",
    Ḹ: "L",
    Ⱡ: "L",
    Ꝉ: "L",
    Ḻ: "L",
    Ŀ: "L",
    Ɫ: "L",
    ǈ: "L",
    Ł: "L",
    Ǉ: "LJ",
    Ḿ: "M",
    Ṁ: "M",
    Ṃ: "M",
    Ɱ: "M",
    Ń: "N",
    Ň: "N",
    Ņ: "N",
    Ṋ: "N",
    Ṅ: "N",
    Ṇ: "N",
    Ǹ: "N",
    Ɲ: "N",
    Ṉ: "N",
    Ƞ: "N",
    ǋ: "N",
    Ñ: "N",
    Ǌ: "NJ",
    Ó: "O",
    Ŏ: "O",
    Ǒ: "O",
    Ô: "O",
    Ố: "O",
    Ộ: "O",
    Ồ: "O",
    Ổ: "O",
    Ỗ: "O",
    Ö: "O",
    Ȫ: "O",
    Ȯ: "O",
    Ȱ: "O",
    Ọ: "O",
    Ő: "O",
    Ȍ: "O",
    Ò: "O",
    Ỏ: "O",
    Ơ: "O",
    Ớ: "O",
    Ợ: "O",
    Ờ: "O",
    Ở: "O",
    Ỡ: "O",
    Ȏ: "O",
    Ꝋ: "O",
    Ꝍ: "O",
    Ō: "O",
    Ṓ: "O",
    Ṑ: "O",
    Ɵ: "O",
    Ǫ: "O",
    Ǭ: "O",
    Ø: "O",
    Ǿ: "O",
    Õ: "O",
    Ṍ: "O",
    Ṏ: "O",
    Ȭ: "O",
    Ƣ: "OI",
    Ꝏ: "OO",
    Ɛ: "E",
    Ɔ: "O",
    Ȣ: "OU",
    Ṕ: "P",
    Ṗ: "P",
    Ꝓ: "P",
    Ƥ: "P",
    Ꝕ: "P",
    Ᵽ: "P",
    Ꝑ: "P",
    Ꝙ: "Q",
    Ꝗ: "Q",
    Ŕ: "R",
    Ř: "R",
    Ŗ: "R",
    Ṙ: "R",
    Ṛ: "R",
    Ṝ: "R",
    Ȑ: "R",
    Ȓ: "R",
    Ṟ: "R",
    Ɍ: "R",
    Ɽ: "R",
    Ꜿ: "C",
    Ǝ: "E",
    Ś: "S",
    Ṥ: "S",
    Š: "S",
    Ṧ: "S",
    Ş: "S",
    Ŝ: "S",
    Ș: "S",
    Ṡ: "S",
    Ṣ: "S",
    Ṩ: "S",
    Ť: "T",
    Ţ: "T",
    Ṱ: "T",
    Ț: "T",
    Ⱦ: "T",
    Ṫ: "T",
    Ṭ: "T",
    Ƭ: "T",
    Ṯ: "T",
    Ʈ: "T",
    Ŧ: "T",
    Ɐ: "A",
    Ꞁ: "L",
    Ɯ: "M",
    Ʌ: "V",
    Ꜩ: "TZ",
    Ú: "U",
    Ŭ: "U",
    Ǔ: "U",
    Û: "U",
    Ṷ: "U",
    Ü: "U",
    Ǘ: "U",
    Ǚ: "U",
    Ǜ: "U",
    Ǖ: "U",
    Ṳ: "U",
    Ụ: "U",
    Ű: "U",
    Ȕ: "U",
    Ù: "U",
    Ủ: "U",
    Ư: "U",
    Ứ: "U",
    Ự: "U",
    Ừ: "U",
    Ử: "U",
    Ữ: "U",
    Ȗ: "U",
    Ū: "U",
    Ṻ: "U",
    Ų: "U",
    Ů: "U",
    Ũ: "U",
    Ṹ: "U",
    Ṵ: "U",
    Ꝟ: "V",
    Ṿ: "V",
    Ʋ: "V",
    Ṽ: "V",
    Ꝡ: "VY",
    Ẃ: "W",
    Ŵ: "W",
    Ẅ: "W",
    Ẇ: "W",
    Ẉ: "W",
    Ẁ: "W",
    Ⱳ: "W",
    Ẍ: "X",
    Ẋ: "X",
    Ý: "Y",
    Ŷ: "Y",
    Ÿ: "Y",
    Ẏ: "Y",
    Ỵ: "Y",
    Ỳ: "Y",
    Ƴ: "Y",
    Ỷ: "Y",
    Ỿ: "Y",
    Ȳ: "Y",
    Ɏ: "Y",
    Ỹ: "Y",
    Ź: "Z",
    Ž: "Z",
    Ẑ: "Z",
    Ⱬ: "Z",
    Ż: "Z",
    Ẓ: "Z",
    Ȥ: "Z",
    Ẕ: "Z",
    Ƶ: "Z",
    Ĳ: "IJ",
    Œ: "OE",
    ᴀ: "A",
    ᴁ: "AE",
    ʙ: "B",
    ᴃ: "B",
    ᴄ: "C",
    ᴅ: "D",
    ᴇ: "E",
    ꜰ: "F",
    ɢ: "G",
    ʛ: "G",
    ʜ: "H",
    ɪ: "I",
    ʁ: "R",
    ᴊ: "J",
    ᴋ: "K",
    ʟ: "L",
    ᴌ: "L",
    ᴍ: "M",
    ɴ: "N",
    ᴏ: "O",
    ɶ: "OE",
    ᴐ: "O",
    ᴕ: "OU",
    ᴘ: "P",
    ʀ: "R",
    ᴎ: "N",
    ᴙ: "R",
    ꜱ: "S",
    ᴛ: "T",
    ⱻ: "E",
    ᴚ: "R",
    ᴜ: "U",
    ᴠ: "V",
    ᴡ: "W",
    ʏ: "Y",
    ᴢ: "Z",
    á: "a",
    ă: "a",
    ắ: "a",
    ặ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ǎ: "a",
    â: "a",
    ấ: "a",
    ậ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ä: "a",
    ǟ: "a",
    ȧ: "a",
    ǡ: "a",
    ạ: "a",
    ȁ: "a",
    à: "a",
    ả: "a",
    ȃ: "a",
    ā: "a",
    ą: "a",
    ᶏ: "a",
    ẚ: "a",
    å: "a",
    ǻ: "a",
    ḁ: "a",
    ⱥ: "a",
    ã: "a",
    ꜳ: "aa",
    æ: "ae",
    ǽ: "ae",
    ǣ: "ae",
    ꜵ: "ao",
    ꜷ: "au",
    ꜹ: "av",
    ꜻ: "av",
    ꜽ: "ay",
    ḃ: "b",
    ḅ: "b",
    ɓ: "b",
    ḇ: "b",
    ᵬ: "b",
    ᶀ: "b",
    ƀ: "b",
    ƃ: "b",
    ɵ: "o",
    ć: "c",
    č: "c",
    ç: "c",
    ḉ: "c",
    ĉ: "c",
    ɕ: "c",
    ċ: "c",
    ƈ: "c",
    ȼ: "c",
    ď: "d",
    ḑ: "d",
    ḓ: "d",
    ȡ: "d",
    ḋ: "d",
    ḍ: "d",
    ɗ: "d",
    ᶑ: "d",
    ḏ: "d",
    ᵭ: "d",
    ᶁ: "d",
    đ: "d",
    ɖ: "d",
    ƌ: "d",
    ı: "i",
    ȷ: "j",
    ɟ: "j",
    ʄ: "j",
    ǳ: "dz",
    ǆ: "dz",
    é: "e",
    ĕ: "e",
    ě: "e",
    ȩ: "e",
    ḝ: "e",
    ê: "e",
    ế: "e",
    ệ: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ḙ: "e",
    ë: "e",
    ė: "e",
    ẹ: "e",
    ȅ: "e",
    è: "e",
    ẻ: "e",
    ȇ: "e",
    ē: "e",
    ḗ: "e",
    ḕ: "e",
    ⱸ: "e",
    ę: "e",
    ᶒ: "e",
    ɇ: "e",
    ẽ: "e",
    ḛ: "e",
    ꝫ: "et",
    ḟ: "f",
    ƒ: "f",
    ᵮ: "f",
    ᶂ: "f",
    ǵ: "g",
    ğ: "g",
    ǧ: "g",
    ģ: "g",
    ĝ: "g",
    ġ: "g",
    ɠ: "g",
    ḡ: "g",
    ᶃ: "g",
    ǥ: "g",
    ḫ: "h",
    ȟ: "h",
    ḩ: "h",
    ĥ: "h",
    ⱨ: "h",
    ḧ: "h",
    ḣ: "h",
    ḥ: "h",
    ɦ: "h",
    ẖ: "h",
    ħ: "h",
    ƕ: "hv",
    í: "i",
    ĭ: "i",
    ǐ: "i",
    î: "i",
    ï: "i",
    ḯ: "i",
    ị: "i",
    ȉ: "i",
    ì: "i",
    ỉ: "i",
    ȋ: "i",
    ī: "i",
    į: "i",
    ᶖ: "i",
    ɨ: "i",
    ĩ: "i",
    ḭ: "i",
    ꝺ: "d",
    ꝼ: "f",
    ᵹ: "g",
    ꞃ: "r",
    ꞅ: "s",
    ꞇ: "t",
    ꝭ: "is",
    ǰ: "j",
    ĵ: "j",
    ʝ: "j",
    ɉ: "j",
    ḱ: "k",
    ǩ: "k",
    ķ: "k",
    ⱪ: "k",
    ꝃ: "k",
    ḳ: "k",
    ƙ: "k",
    ḵ: "k",
    ᶄ: "k",
    ꝁ: "k",
    ꝅ: "k",
    ĺ: "l",
    ƚ: "l",
    ɬ: "l",
    ľ: "l",
    ļ: "l",
    ḽ: "l",
    ȴ: "l",
    ḷ: "l",
    ḹ: "l",
    ⱡ: "l",
    ꝉ: "l",
    ḻ: "l",
    ŀ: "l",
    ɫ: "l",
    ᶅ: "l",
    ɭ: "l",
    ł: "l",
    ǉ: "lj",
    ſ: "s",
    ẜ: "s",
    ẛ: "s",
    ẝ: "s",
    ḿ: "m",
    ṁ: "m",
    ṃ: "m",
    ɱ: "m",
    ᵯ: "m",
    ᶆ: "m",
    ń: "n",
    ň: "n",
    ņ: "n",
    ṋ: "n",
    ȵ: "n",
    ṅ: "n",
    ṇ: "n",
    ǹ: "n",
    ɲ: "n",
    ṉ: "n",
    ƞ: "n",
    ᵰ: "n",
    ᶇ: "n",
    ɳ: "n",
    ñ: "n",
    ǌ: "nj",
    ó: "o",
    ŏ: "o",
    ǒ: "o",
    ô: "o",
    ố: "o",
    ộ: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ö: "o",
    ȫ: "o",
    ȯ: "o",
    ȱ: "o",
    ọ: "o",
    ő: "o",
    ȍ: "o",
    ò: "o",
    ỏ: "o",
    ơ: "o",
    ớ: "o",
    ợ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ȏ: "o",
    ꝋ: "o",
    ꝍ: "o",
    ⱺ: "o",
    ō: "o",
    ṓ: "o",
    ṑ: "o",
    ǫ: "o",
    ǭ: "o",
    ø: "o",
    ǿ: "o",
    õ: "o",
    ṍ: "o",
    ṏ: "o",
    ȭ: "o",
    ƣ: "oi",
    ꝏ: "oo",
    ɛ: "e",
    ᶓ: "e",
    ɔ: "o",
    ᶗ: "o",
    ȣ: "ou",
    ṕ: "p",
    ṗ: "p",
    ꝓ: "p",
    ƥ: "p",
    ᵱ: "p",
    ᶈ: "p",
    ꝕ: "p",
    ᵽ: "p",
    ꝑ: "p",
    ꝙ: "q",
    ʠ: "q",
    ɋ: "q",
    ꝗ: "q",
    ŕ: "r",
    ř: "r",
    ŗ: "r",
    ṙ: "r",
    ṛ: "r",
    ṝ: "r",
    ȑ: "r",
    ɾ: "r",
    ᵳ: "r",
    ȓ: "r",
    ṟ: "r",
    ɼ: "r",
    ᵲ: "r",
    ᶉ: "r",
    ɍ: "r",
    ɽ: "r",
    ↄ: "c",
    ꜿ: "c",
    ɘ: "e",
    ɿ: "r",
    ś: "s",
    ṥ: "s",
    š: "s",
    ṧ: "s",
    ş: "s",
    ŝ: "s",
    ș: "s",
    ṡ: "s",
    ṣ: "s",
    ṩ: "s",
    ʂ: "s",
    ᵴ: "s",
    ᶊ: "s",
    ȿ: "s",
    ɡ: "g",
    ᴑ: "o",
    ᴓ: "o",
    ᴝ: "u",
    ť: "t",
    ţ: "t",
    ṱ: "t",
    ț: "t",
    ȶ: "t",
    ẗ: "t",
    ⱦ: "t",
    ṫ: "t",
    ṭ: "t",
    ƭ: "t",
    ṯ: "t",
    ᵵ: "t",
    ƫ: "t",
    ʈ: "t",
    ŧ: "t",
    ᵺ: "th",
    ɐ: "a",
    ᴂ: "ae",
    ǝ: "e",
    ᵷ: "g",
    ɥ: "h",
    ʮ: "h",
    ʯ: "h",
    ᴉ: "i",
    ʞ: "k",
    ꞁ: "l",
    ɯ: "m",
    ɰ: "m",
    ᴔ: "oe",
    ɹ: "r",
    ɻ: "r",
    ɺ: "r",
    ⱹ: "r",
    ʇ: "t",
    ʌ: "v",
    ʍ: "w",
    ʎ: "y",
    ꜩ: "tz",
    ú: "u",
    ŭ: "u",
    ǔ: "u",
    û: "u",
    ṷ: "u",
    ü: "u",
    ǘ: "u",
    ǚ: "u",
    ǜ: "u",
    ǖ: "u",
    ṳ: "u",
    ụ: "u",
    ű: "u",
    ȕ: "u",
    ù: "u",
    ủ: "u",
    ư: "u",
    ứ: "u",
    ự: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ȗ: "u",
    ū: "u",
    ṻ: "u",
    ų: "u",
    ᶙ: "u",
    ů: "u",
    ũ: "u",
    ṹ: "u",
    ṵ: "u",
    ᵫ: "ue",
    ꝸ: "um",
    ⱴ: "v",
    ꝟ: "v",
    ṿ: "v",
    ʋ: "v",
    ᶌ: "v",
    ⱱ: "v",
    ṽ: "v",
    ꝡ: "vy",
    ẃ: "w",
    ŵ: "w",
    ẅ: "w",
    ẇ: "w",
    ẉ: "w",
    ẁ: "w",
    ⱳ: "w",
    ẘ: "w",
    ẍ: "x",
    ẋ: "x",
    ᶍ: "x",
    ý: "y",
    ŷ: "y",
    ÿ: "y",
    ẏ: "y",
    ỵ: "y",
    ỳ: "y",
    ƴ: "y",
    ỷ: "y",
    ỿ: "y",
    ȳ: "y",
    ẙ: "y",
    ɏ: "y",
    ỹ: "y",
    ź: "z",
    ž: "z",
    ẑ: "z",
    ʑ: "z",
    ⱬ: "z",
    ż: "z",
    ẓ: "z",
    ȥ: "z",
    ẕ: "z",
    ᵶ: "z",
    ᶎ: "z",
    ʐ: "z",
    ƶ: "z",
    ɀ: "z",
    ﬀ: "ff",
    ﬃ: "ffi",
    ﬄ: "ffl",
    ﬁ: "fi",
    ﬂ: "fl",
    ĳ: "ij",
    œ: "oe",
    ﬆ: "st",
    ₐ: "a",
    ₑ: "e",
    ᵢ: "i",
    ⱼ: "j",
    ₒ: "o",
    ᵣ: "r",
    ᵤ: "u",
    ᵥ: "v",
    ₓ: "x",
};
String.prototype.noDiacritics = function (n) {
    var t = this.replace(/[^A-Za-z0-9\[\] ]/g, function (n) {
        return NoDiacritics.map[n] || n;
    });
    return n === !1 ? t : t.toLowerCase();
};
$(function () {
    $(".date-range").each(function () {
        var n = $(this);
        n.find(".date-range-selector").bind("click", function () {
            $.dateRangeSelector(n);
        });
    });
}),
    (function (n) {
        function h(h, c) {
            var h = n(h),
                v = h.attr("data-max-range-in-days") || 0,
                l,
                a;
            (!c && v && v <= 366 && ((c = {}), (c.values = n.dateRangeSelector.defaults.values.slice(0, 4))), e && (f(), i != null && h[0] == i[0])) ||
                (u == null &&
                    (n('<div id="date-range-popup" style="position:absolute; display:none; z-index:90;" class="k-list-container k-popup k-group k-reset date-range-popup"><ul class="k-list k-reset date-range-sel"></ul></div>').appendTo(
                        "body"
                    ),
                    (u = n("#date-range-popup"))),
                (i == null || h[0] != i[0]) &&
                    ((i = n(h)),
                    (t = i.find("input:first")),
                    (o = t.data("kendoDateTimePicker") || t.data("tDateTimePicker")),
                    (t = t.data("kendoDatePicker") || t.data("kendoDateTimePicker") || t.data("tDatePicker") || t.data("tDateTimePicker")),
                    (r = i.find("input:last")),
                    (r = r.data("kendoDatePicker") || r.data("kendoDateTimePicker") || r.data("tDatePicker") || r.data("tDateTimePicker")),
                    (c = n.extend({}, n.dateRangeSelector.defaults, c || {})),
                    (l = u.find("ul")),
                    l.empty(),
                    n("<li />")
                        .html(c.clearLabel)
                        .addClass("k-item")
                        .appendTo(l)
                        .css("font-weight", "bold")
                        .bind("click", function () {
                            s("", "");
                        }),
                    n.each(c.values, function () {
                        var t = this.start,
                            i = this.end;
                        n("<li />")
                            .html(this.text)
                            .addClass("k-item")
                            .appendTo(l)
                            .bind("click", function () {
                                s(t, i);
                            });
                    })),
                (a = i.offset()),
                u.css("top", a.top + i.outerHeight() - 1),
                u.css("left", a.left),
                u.width(i.outerWidth() - 2),
                u.show(),
                (e = !0),
                n(document).bind("mousedown", f));
        }
        function s(n, i) {
            var e = new Date(),
                s = new Date(),
                u;
            switch (n) {
                case "last week":
                    e.setDate(e.getDate() - 7);
                    n = e;
                    break;
                case "last month":
                    e.setMonth(e.getMonth() - 1);
                    n = e;
                    break;
                case "month":
                    e.setDate(1);
                    n = e;
                    break;
                case "year":
                    e.setDate(1);
                    e.setMonth(0);
                    n = e;
                    break;
                case "today":
                    n = e;
            }
            switch (i) {
                case "today":
                    i = s;
            }
            t.value(n);
            r.value(i);
            o &&
                (n && ((u = t.value()), u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0), t.value(u)),
                i && ((u = r.value()), u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0), u.setDate(u.getDate() + 1), r.value(u)));
            inputUnhighlight((t.$element || t.element)[0]);
            f();
        }
        function f(t) {
            return (t && (n(t.target).is(".date-range-selector") || n(t.target).parent().is(".date-range-sel"))) || (u.hide(), n(document).unbind("mousedown", f), (e = !1)), !0;
        }
        n.dateRangeSelector = function (n, t) {
            h(n, t);
        };
        n.dateRangeSelector.defaults = {
            clearLabel: "Clear",
            values: [
                { text: "Today", start: "today", end: "today" },
                { text: "Last 7 days", start: "last week", end: "today" },
                { text: "Last month", start: "last month", end: "today" },
                { text: "Month to date", start: "month", end: "today" },
                { text: "Year to date", start: "year", end: "today" },
            ],
        };
        var u = null,
            i = null,
            t = null,
            r = null,
            e = !1,
            o = !1;
    })(jQuery);
$(function () {
    $(".k-grid-exg").each(function () {
        var n = $(this),
            t = n.data("kendoGrid");
        t &&
            (t.dataSource.bind("error", function (n) {
                n.isDefaultPrevented() || this.cancelChanges();
            }),
            t.dataSource.bind("requestEnd", function (t) {
                var i, r, u, f, e;
                if (t.response && t.type == "read") {
                    if (((i = t.response.Errors), (t.response.Errors = null), (r = $("#" + n[0].id + "_MoreRecords")), r.hide().empty(), (u = $("#" + n[0].id + "_Errors")), u.hide().empty(), i && i.MODELERRORKEY_WARNING)) {
                        for (
                            r.length || ((r = $("<ul/>", { id: n[0].id + "_MoreRecords", class: "alert alert-warning" })), $('<div class="no-top-margin no-bottom-margin"/>').append(r).insertBefore(n)),
                                r.append('<span class="close" data-dismiss="alert">×</span>'),
                                f = 0;
                            f < i.MODELERRORKEY_WARNING.errors.length;
                            f++
                        )
                            (e = $("<li/>")), e.text(i.MODELERRORKEY_WARNING.errors[f]), r.append(e);
                        r.show("fast");
                    }
                    if (i && i.MODELERRORKEY_ERROR) {
                        for (
                            u.length || ((u = $("<ul/>", { id: n[0].id + "_Errors", class: "alert alert-warning" })), $('<div class="no-top-margin no-bottom-margin"/>').append(u).insertBefore(n)),
                                u.append('<span class="close" data-dismiss="alert">×</span>'),
                                f = 0;
                            f < i.MODELERRORKEY_ERROR.errors.length;
                            f++
                        )
                            (e = $("<li/>")), e.text(i.MODELERRORKEY_ERROR.errors[f]), u.append(e);
                        u.show("fast");
                    }
                }
            }));
    });
}),
    (function (n) {
        function o(o, s) {
            var y = o == window,
                c = s && s.message !== undefined ? s.message : undefined,
                nt,
                tt,
                k,
                w,
                rt,
                ut,
                ft,
                lt;
            s = n.extend({}, n.blockUI.defaults, s || {});
            s.overlayCSS = n.extend({}, n.blockUI.defaults.overlayCSS, s.overlayCSS || {});
            nt = n.extend({}, n.blockUI.defaults.css, s.css || {});
            tt = n.extend({}, n.blockUI.defaults.themedCSS, s.themedCSS || {});
            c = c === undefined ? s.message : c;
            y && t && f(window, { fadeOut: 0 });
            c &&
                typeof c != "string" &&
                (c.parentNode || c.jquery) &&
                ((k = c.jquery ? c[0] : c), (w = {}), n(o).data("blockUI.history", w), (w.el = k), (w.parent = k.parentNode), (w.display = k.style.display), (w.position = k.style.position), w.parent && w.parent.removeChild(k));
            n(o).data("blockUI.onUnblock", s.onUnblock);
            var b = s.baseZ,
                g = s.forceIframe
                    ? n('<iframe class="blockUI" style="z-index:' + b++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + s.iframeSrc + '"></iframe>')
                    : n('<div class="blockUI" style="display:none"></div>'),
                d = s.theme
                    ? n('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + b++ + ';display:none"></div>')
                    : n('<div class="blockUI blockOverlay" style="z-index:' + b++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),
                p,
                it;
            if (
                ((it =
                    s.theme && y
                        ? '<div class="blockUI ' +
                          s.blockMsgClass +
                          ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                          (b + 10) +
                          ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                          (s.title || "&nbsp;") +
                          '</div><div class="ui-widget-content ui-dialog-content"></div></div>'
                        : s.theme
                        ? '<div class="blockUI ' +
                          s.blockMsgClass +
                          ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' +
                          (b + 10) +
                          ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                          (s.title || "&nbsp;") +
                          '</div><div class="ui-widget-content ui-dialog-content"></div></div>'
                        : y
                        ? '<div class="blockUI ' + s.blockMsgClass + ' blockPage" style="z-index:' + (b + 10) + ';display:none;position:fixed"></div>'
                        : '<div class="blockUI ' + s.blockMsgClass + ' blockElement" style="z-index:' + (b + 10) + ';display:none;position:absolute"></div>'),
                (p = n(it)),
                c && (s.theme ? (p.css(tt), p.addClass("ui-widget-content")) : p.css(nt)),
                s.theme || s.applyPlatformOpacityRules || d.css(s.overlayCSS),
                d.css("position", y ? "fixed" : "absolute"),
                s.forceIframe && g.css("opacity", 0),
                (rt = [g, d, p]),
                (ut = y ? n("body") : n(o)),
                n.each(rt, function () {
                    this.appendTo(ut);
                }),
                s.theme && s.draggable && n.fn.draggable && p.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" }),
                (ft = a && (!n.boxModel || n("object,embed", y ? null : o).length > 0)),
                e || ft)
            ) {
                if ((y && s.allowBodyStretch && n.boxModel && n("html,body").css("height", "100%"), (e || !n.boxModel) && !y))
                    var et = r(o, "borderTopWidth"),
                        ot = r(o, "borderLeftWidth"),
                        st = et ? "(0 - " + et + ")" : 0,
                        ht = ot ? "(0 - " + ot + ")" : 0;
                n.each([g, d, p], function (n, t) {
                    var i = t[0].style,
                        r,
                        u;
                    i.position = "absolute";
                    n < 2
                        ? (y
                              ? i.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:" + s.quirksmodeOffsetHack + ') + "px"')
                              : i.setExpression("height", 'this.parentNode.offsetHeight + "px"'),
                          y ? i.setExpression("width", 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : i.setExpression("width", 'this.parentNode.offsetWidth + "px"'),
                          ht && i.setExpression("left", ht),
                          st && i.setExpression("top", st))
                        : s.centerY
                        ? (y &&
                              i.setExpression(
                                  "top",
                                  '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'
                              ),
                          (i.marginTop = 0))
                        : !s.centerY &&
                          y &&
                          ((r = s.css && s.css.top ? parseInt(s.css.top) : 0), (u = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + r + ') + "px"'), i.setExpression("top", u));
                });
            }
            if ((c && (s.theme ? p.find(".ui-widget-content").append(c) : p.append(c), (c.jquery || c.nodeType) && n(c).show()), s.forceIframe && s.showOverlay && g.show(), s.fadeIn)) {
                var ct = s.onBlock ? s.onBlock : u,
                    at = s.showOverlay && !c ? ct : u,
                    vt = c ? ct : u;
                s.showOverlay && d._fadeIn(s.fadeIn, at);
                c && p._fadeIn(s.fadeIn, vt);
            } else s.showOverlay && d.show(), c && p.show(), s.onBlock && s.onBlock();
            h(1, o, s);
            y ? ((t = p[0]), (i = n(":input:enabled:visible", t)), s.focusInput && setTimeout(l, 20)) : v(p[0], s.centerX, s.centerY);
            s.timeout &&
                ((lt = setTimeout(function () {
                    y ? n.unblockUI(s) : n(o).unblock(s);
                }, s.timeout)),
                n(o).data("blockUI.timeout", lt));
        }
        function f(r, u) {
            var o = r == window,
                f = n(r),
                c = f.data("blockUI.history"),
                l = f.data("blockUI.timeout"),
                e;
            l && (clearTimeout(l), f.removeData("blockUI.timeout"));
            u = n.extend({}, n.blockUI.defaults, u || {});
            h(0, r, u);
            u.onUnblock === null && ((u.onUnblock = f.data("blockUI.onUnblock")), f.removeData("blockUI.onUnblock"));
            e = o ? n("body").children().filter(".blockUI").add("body > .blockUI") : n(".blockUI", r);
            o && (t = i = null);
            u.fadeOut
                ? (e.fadeOut(u.fadeOut),
                  setTimeout(function () {
                      s(e, c, u, r);
                  }, u.fadeOut))
                : s(e, c, u, r);
            e.each(function (t, i) {
                n(i).css("cursor", "default");
            });
        }
        function s(t, i, r, u) {
            if (
                (t.each(function () {
                    this.parentNode && this.parentNode.removeChild(this);
                }),
                i && i.el && ((i.el.style.display = i.display), (i.el.style.position = i.position), i.parent && i.parent.appendChild(i.el), n(u).removeData("blockUI.history")),
                typeof r.onUnblock == "function")
            )
                r.onUnblock(u, r);
        }
        function h(i, r, u) {
            var f = r == window,
                o = n(r),
                e;
            (i || ((!f || t) && (f || o.data("blockUI.isBlocked")))) &&
                (f || o.data("blockUI.isBlocked", i), u.bindEvents && (!i || u.showOverlay)) &&
                ((e = "mousedown mouseup keydown keypress"), i ? n(document).bind(e, u, c) : n(document).unbind(e, c));
        }
        function c(r) {
            var e;
            if (r.keyCode && r.keyCode == 9 && t && r.data.constrainTabKey) {
                var u = i,
                    o = !r.shiftKey && r.target === u[u.length - 1],
                    f = r.shiftKey && r.target === u[0];
                if (o || f)
                    return (
                        setTimeout(function () {
                            l(f);
                        }, 10),
                        !1
                    );
            }
            return ((e = r.data), n(r.target).parents("div." + e.blockMsgClass).length > 0) ? !0 : n(r.target).parents().children().filter("div.blockUI").length == 0;
        }
        function l(n) {
            if (i) {
                var t = i[n === !0 ? i.length - 1 : 0];
                t && t.focus();
            }
        }
        function v(n, t, i) {
            var u = n.parentNode,
                f = n.style,
                e = (u.offsetWidth - n.offsetWidth) / 2 - r(u, "borderLeftWidth"),
                o = (u.offsetHeight - n.offsetHeight) / 2 - r(u, "borderTopWidth");
            t && (f.left = e > 0 ? e + "px" : "0");
            i && (f.top = o > 0 ? o + "px" : "0");
        }
        function r(t, i) {
            return parseInt(n.css(t, i)) || 0;
        }
        var t, i;
        n.fn._fadeIn = n.fn.fadeIn;
        var u = function () {},
            y = document.documentMode || 0,
            a = !1,
            e = !1;
        n.blockUI = function (n) {
            o(window, n);
        };
        n.unblockUI = function (n) {
            f(window, n);
        };
        n.growlUI = function (t, i, r, u) {
            var f = n('<div class="growlUI"></div>');
            t && f.append("<h1>" + t + "</h1>");
            i && f.append("<h2>" + i + "</h2>");
            r == undefined && (r = 3e3);
            n.blockUI({ message: f, fadeIn: 700, fadeOut: 1e3, centerY: !1, timeout: r, showOverlay: !1, onUnblock: u, css: n.blockUI.defaults.growlCSS });
        };
        n.fn.block = function (t) {
            return this.unblock({ fadeOut: 0 }).each(function () {
                n.css(this, "position") == "static" && (this.style.position = "relative");
                o(this, t);
            });
        };
        n.fn.unblock = function (n) {
            return this.each(function () {
                f(this, n);
            });
        };
        n.blockUI.version = 2.39;
        n.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: { padding: 0, margin: 0, width: "30%", top: "30%", left: "50%", marginLeft: "-15%", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" },
            themedCSS: { width: "30%", top: "30%", left: "35%", marginLeft: "-15%" },
            overlayCSS: { backgroundColor: "#000", opacity: 0.6, cursor: "wait" },
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: 0.6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px",
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            applyPlatformOpacityRules: !0,
            onBlock: null,
            onUnblock: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
        };
        t = null;
        i = [];
    })(jQuery),
    (function (n) {
        function t(t) {
            var i = n("#ConfirmBox");
            return (
                i.length == 0 &&
                    (i = n(
                        '<div style="display: none; cursor:default;" id="ConfirmBox" class="form k-widget k-window k-dialog"><div class="k-window-titlebar k-dialog-titlebar k-header">&nbsp;<span class="k-window-title k-dialog-title"></span><div class="k-window-actions"><a class="k-window-action k-link" href="#"><span class="k-icon k-i-close" onclick="$(\'#AuditComment\').val(\'\');$.unblockUI()"></span></a></div></div><div style="width: 550px;" class="k-window-content k-content"><div id="confirm_messages" class="messages-container" style="margin-bottom:0.5em;display:none;"><ul><li style="display:none"></li></ul></div><div id="confirm_additionalHtml"></div><div id="confirm_auditComments"><div><label id="AuditCommentsLabel" for="AuditComment"></label></div><div class="form-group"><textarea name="AuditComment" id="AuditComment" style="width:93%; height:5em;" maxlength="250" class="form-control"></textarea></div><div style="margin: 0.5em 0 0.5em 0;">Please keep comment under 250 characters long</div></div><div style="margin-top:0.5em;float:right"><button id="ConfirmBox_Cancel" type="button" class="btn btn-primary btn-sm" onclick="$(\'#AuditComment\').val(\'\');setTimeout($.unblockUI, 1)"></button>&nbsp;<button id="ConfirmBox_OK" type="button" class="btn btn-secondary btn-sm"></button></div></div></div>'
                    )),
                i.detach().appendTo(t)
            );
        }
        function i(t, i, r) {
            var e, o, u, f;
            n("#confirm_additionalHtml").html(r.additionalHtml);
            e = [];
            r.warnings.length && e.push({ Key: "MODELERRORKEY_WARNING", Value: r.warnings.length ? r.warnings : [] });
            r.infos.length && e.push({ Key: "MODELERRORKEY_INFO", Value: r.infos.length ? r.infos : [] });
            e.length ? displayMessages(e, "ConfirmBox") : hideErrors("ConfirmBox");
            r.noComments ? n("#confirm_auditComments").hide() : n("#confirm_auditComments").show();
            i.find("span.k-window-title").text(r.title);
            i.find("span.k-close").text(r.closeLabel);
            o = n("#ConfirmBox_Cancel");
            o.text(r.cancelText);
            n("#AuditCommentsLabel").text(r.commentsLabel);
            u = n("#ConfirmBox_OK");
            u.unbind("click");
            f = n(r.triggerButton);
            f.length > 0 ? (u.text(f.text() || f.val()), u.val(f.val()), u.attr("name", f.attr("name") ? f.attr("name") : r.okName)) : (u.text(r.okText), u.val(r.okValue), u.attr("name", r.okName));
            n("#confirm_maxLengthWarning").html(r.maxLengthWarning);
            u.bind("click", function () {
                setTimeout(function () {
                    if (r.commentsRequired && !n.trim(n("#AuditComment").val())) {
                        displayError(r.commentsLabel + " Required", "ConfirmBox");
                        inputHighlight("#AuditComment");
                        return;
                    }
                    inputUnhighlight("#AuditComment");
                    var i = window.onbeforeunload;
                    window.onbeforeunload = null;
                    r.onOk.apply(t, [n("#AuditComment").val(), u.attr("name"), u.val(), r.submitAction, r.submitData, r.onSuccess]) !== !1 && (r.onAfterOk && r.onAfterOk.apply(), n("#AuditComment").val(""));
                    window.onbeforeunload = i;
                }, 1);
            });
            o.bind("click", function () {
                setTimeout(function () {
                    r.onCancel && r.onCancel.apply();
                }, 1);
            });
        }
        function r(t, i, r, u, f, e) {
            if (f) u || (u = this.action), (f.AuditComment = t), (f[i] = r), n.post(u, f, e).fail(handleAjaxError);
            else {
                var o = this[0].action;
                u || (u = o);
                this[0].action = u;
                this.append(n("<input/>", { id: "ConfirmedAction", type: "hidden", name: i, value: r }));
                this.submit();
                this[0].action = o;
                n("#ConfirmedAction").remove();
            }
        }
        n.fn.confirmBox = function (r) {
            var u = n(this),
                e = u.is("form"),
                f,
                o;
            if ((e || (u = n(document.forms[0])), (f = t(u)), isAjaxActive)) {
                setTimeout(function () {
                    u.confirmBox(r);
                }, 100);
                return;
            }
            return (!e || u.validate().form()) && ((o = n.extend({}, n.fn.confirmBox.defaults, r)), i(u, f, o), n.blockUI({ fadeIn: 0, message: f })), !1;
        };
        n.fn.confirmBox.defaults = {
            title: "Please confirm",
            closeLabel: "Close",
            commentsLabel: "Comments",
            commentsRequired: !1,
            noComments: !1,
            cancelText: "Cancel",
            onOk: r,
            onCancel: null,
            okText: "Ok",
            okValue: null,
            okName: "ConfirmBox_OK",
            triggerButton: null,
            submitAction: null,
            submitData: null,
            onSuccess: null,
            warnings: [],
            infos: [],
            additionalHtml: "",
        };
    })(jQuery);
$.strPad = function (n, t, i) {
    var r = n.toString();
    for (i || (i = "0"); r.length < t; ) r = i + r;
    return r;
};
{
    function getCookie(n) {
        for (var r, u, i = document.cookie.split(";"), t = 0; t < i.length; t++) if (((r = i[t].substr(0, i[t].indexOf("="))), (u = i[t].substr(i[t].indexOf("=") + 1)), (r = r.replace(/^\s+|\s+$/g, "")), r == n)) return unescape(u);
    }
    function checkCookie(n, t) {
        var i = getCookie(n);
        return t !== undefined ? i && t == i : i;
    }
    function setCookie(n, t, i) {
        var r = new Date(),
            u;
        r.setTime(r.getTime() + i * 864e5);
        u = "expires=" + r.toUTCString();
        document.cookie = n + "=" + t + ";" + u + ";path=/";
    }
}
$(function () {
    checkCookie("cookienotice_sp", "dismiss") || $("#cookienotice").show();
});
$.validator &&
    ($.validator.setDefaults({
        errorClass: "has-error",
        validClass: "has-success",
        ignore: "",
        highlight: function (n) {
            inputHighlight(n);
        },
        unhighlight: function (n) {
            inputUnhighlight(n);
        },
        focusInvalid: !1,
    }),
    $.validator.addMethod("requiredif", function (n, t, i) {
        var f = i.dependentproperty,
            r = $("#" + f),
            o,
            e,
            u,
            s,
            h;
        if (!r.length) for (o = t.id.split("_"), e = o.length - 2; e >= 0; e--) if (((f = o[e] + "_" + f), (r = $("#" + f)), r.length)) break;
        return ((u = i.targetvalue),
        (u = (u == null ? "" : u).toString()),
        (s = r.attr("type")),
        (h = s == "checkbox" || s == "radio" ? (r.is(":checked") ? r.val() : !1) : r.val()),
        $.trim(u).toLowerCase() === $.trim(h).toLocaleLowerCase())
            ? $.validator.methods.required.call(this, n, t, i)
            : !0;
    }),
    $.validator.addMethod("futuredate", function (n, t) {
        var i = $("#" + t.id);
        if (i.is("[data-val-futuredate]") && n != "") {
            var r = kendo.parseDate(n),
                u = kendo.parseInt(i.attr("data-val-futuredate-days")),
                f = new Date();
            return !r || !u || r.getTime() > addDays(new Date(), u - 1).getTime();
        }
        return !0;
    }),
    $.validator.addMethod("minage", function (n, t) {
        var i = $("#" + t.id);
        if (i.is("[data-val-minage]") && n != "") {
            var r = kendo.parseDate(n),
                u = kendo.parseInt(i.attr("data-val-minage-years")),
                f = getAge(r);
            return !r || !u || f > u;
        }
        return !0;
    }),
    $.validator.addMethod("greaterdate", function (n, t) {
        var i = $("#" + t.id),
            r,
            u;
        return i.is("[data-val-greaterdate]") && i.val() != "" ? ((r = kendo.parseDate(i.val())), (u = kendo.parseDate($("[name*='" + i.attr("data-val-greaterdate-earlierdate") + "']").val())), !r || !u || u.getTime() < r.getTime()) : !0;
    }),
    $.validator.addMethod("maxmonthsspan", function (n, t) {
        var i = $("#" + t.id),
            r,
            u;
        return i.is("[data-val-maxmonthsspan]") && i.val() != ""
            ? ((r = kendo.parseDate(i.val())),
              (u = kendo.parseInt(i.attr("data-val-maxmonthsspan-months"))),
              (earlierDate = kendo.parseDate($("[name*='" + i.attr("data-val-maxmonthsspan-earlierdate") + "']").val())),
              !r || !earlierDate || addDays(r, -1).getTime() < addMonths(earlierDate, u))
            : !0;
    }),
    $.validator.addMethod("requiredifnot", function (n, t, i) {
        var f = i.dependentproperty,
            r = $("#" + f),
            o,
            e,
            u,
            s,
            h;
        if (!r.length) for (o = t.id.split("_"), e = o.length - 2; e >= 0; e--) if (((f = o[e] + "_" + f), (r = $("#" + f)), r.length)) break;
        return ((u = i.targetvalue),
        (u = (u == null ? "" : u).toString()),
        (s = r.attr("type")),
        (h = s == "checkbox" || s == "radio" ? (r.is(":checked") ? r.val() : !1) : r.val()),
        $.trim(u).toLowerCase() === $.trim(h).toLocaleLowerCase())
            ? $.validator.methods.required.call(this, n, t, i)
            : !0;
    }),
    $.validator.addMethod("startswithletter", function (n, t) {
        return this.optional(t) || /^[A-Z]/i.test(n.noDiacritics());
    }),
    $.validator.unobtrusive &&
        ($.validator.unobtrusive.adapters.add("requiredif", ["dependentproperty", "targetvalue"], function (n) {
            n.rules.requiredif = { dependentproperty: n.params.dependentproperty, targetvalue: n.params.targetvalue };
            n.messages.requiredif = n.message;
        }),
        $.validator.unobtrusive.adapters.add("requiredifnot", ["dependentproperty", "targetvalue"], function (n) {
            n.rules.requiredifnot = { dependentproperty: n.params.dependentproperty, targetvalue: n.params.targetvalue };
            n.messages.requiredifnot = n.message;
        }),
        $.validator.unobtrusive.adapters.add("greaterdate", {}, function (n) {
            n.rules.greaterdate = !0;
            n.messages.greaterdate = n.message;
        }),
        $.validator.unobtrusive.adapters.add("futuredate", {}, function (n) {
            n.rules.futuredate = !0;
            n.messages.futuredate = n.message;
        }),
        $.validator.unobtrusive.adapters.add("minage", {}, function (n) {
            n.rules.minage = !0;
            n.messages.minage = n.message;
        }),
        $.validator.unobtrusive.adapters.add("maxmonthsspan", ["earlierdate"], function (n) {
            n.rules.maxmonthsspan = { earlierdate: n.params.earlierdate };
            n.messages.maxmonthsspan = n.message;
        }),
        $.validator.unobtrusive.adapters.add("startswithletter", {}, function (n) {
            n.rules.startswithletter = !0;
            n.messages.startswithletter = n.message;
        })));

