/// <reference path="typings/jquery/jquery.d.ts" />
/*
 * This file is for async init of UmbracoForms form in the html code.
 * Make sure to include this file: 
 * Html.RequiresJs("~/scripts/umbracofrom.jquery.js");
*/

var umbracoForms: any;
module UmbracoForms {
    export class Form {
        private formId: string;
        private formName: string;
        private contourFieldValues;
        private recordValues : any;
        private fsConditions : any;
        private fieldConditions: any;
        private form: HTMLElement;

        constructor(element: HTMLElement) {
            if (!element)
                throw "Parameter element is null or empty";

            this.formId = element.getAttribute("umbracoform");
            this.formName = element.getAttribute("name");
            this.recordValues = JSON.parse($("#values_" + this.formId).val());
            this.fsConditions = JSON.parse($("#fsConditions_" + this.formId).val());
            this.fieldConditions = JSON.parse($("#fieldConditions_" + this.formId).val());
            this.form = element;

            $(".contourPage input, .contourPage textarea, .contourPage select", this.form)
                .change(() => {
                this.PopulateFieldValues();
                this.CheckRules();
            });

            this.PopulateFieldValues();
            this.CheckRules();
        }

        PopulateFieldValues() {
            this.PopulateRecordValues();

            $(".contourPage select", this.form).each((index, elm) => {
                this.contourFieldValues[$(elm).attr("id")] = $("option[value='" + $(elm).val() + "']", $(elm)).text();
            });

            $(".contourPage textarea", this.form).each((index, elm) => {
                this.contourFieldValues[$(elm).attr("id")] = $(elm).val();
            });

            $(".contourPage input", this.form).each((index, elm) => {

                if ($(elm).attr('type') == "text" || $(elm).attr("type") == "hidden") {
                    this.contourFieldValues[$(elm).attr("id")] = $(elm).val();
                }

                if ($(elm).attr('type') == "radio") {
                    if ($(elm).is(':checked')) {
                        this.contourFieldValues[$(elm).attr("name")] = $(elm).val();
                    }
                }

                if ($(elm).attr('type') == "checkbox") {

                    if ($(elm).attr('id') != $(elm).attr('name')) {
                        if ($(elm).is(':checked')) {
                            if (this.contourFieldValues[$(elm).attr("name")] == null) {
                                this.contourFieldValues[$(elm).attr("name")] = $(elm).val();
                            }
                            else {
                                this.contourFieldValues[$(elm).attr("name")] += "," + $(elm).val();
                            }
                        }
                    } else {

                        this.contourFieldValues[$(elm).attr("name")] = $(elm).is(':checked').toString();
                    }
                }

            });
        }

        PopulateRecordValues() {
            var fieldId;
            this.contourFieldValues = new Array();

            for (fieldId in this.recordValues) {
                if ($("#" + fieldId).length === 0) {
                    this.contourFieldValues[fieldId] = this.recordValues[fieldId];
                }
            }
        }

        CheckRules() {
            umbracoForms.conditions.handle({
                fsConditions: this.fsConditions,
                fieldConditions: this.fieldConditions,
                values: this.contourFieldValues
            });
        }
    }
}

$(function () {
    var forms = $('[umbracoform]');
    $.each(forms, (index, element) => {
        new UmbracoForms.Form(element);
    });
});