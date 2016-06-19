using ClientDependency.Core;
using Umbraco.Core;

namespace ClientName.Web {
    public class BundleConfig : IApplicationEventHandler {
        public void OnApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
            CreateBundles();
        }

        public static void CreateBundles() {
            /*
                Requires the following bower components:
                    "jquery-validate": "^1.14.0",
                    "jquery-validation-unobtrusive": "^3.2.5",
                    "jquery-validate-bootstrap": "*"
            */
            BundleManager.CreateJsBundle("jquery.validate",
                new JavascriptFile("~/content/components/jquery-validate/dist/jquery.validate.js"),
                new JavascriptFile("~/content/components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"),
                new JavascriptFile("~/content/components/jquery-validate-bootstrap/jquery.validate.bootstrap.js"));

            /*
                Requires the following bower components:
                    "picturefill": "^3.0.1",
                    "picturefill-background": "*",
                    "imagesloaded": "^4.1.0",
                    "masonry": "^4.0.0",
                    "isotope": "^2.2.2",
            */
            BundleManager.CreateJsBundle("core",
                new JavascriptFile("~/content/components/bootstrap/dist/js/bootstrap.min.js"),
                new JavascriptFile("~/content/components/picturefill/dist/picturefill.min.js"),
                // TODO: Add picturefill-background
                //new JavascriptFile("~/content/components/picturefill/dist/picturefill.min.js"),
                new JavascriptFile("~/content/components/imagesloaded/imagesloaded.pkgd.min.js"),
                new JavascriptFile("~/content/components/masonry/dist/masonry.pkgd.min.js"),
                new JavascriptFile("~/content/components/isotope/dist/isotope.pkgd.min.js"));

            /*
                Requires the following bower components:
                    "angular": "1.4.0",
                    "angular-sanitize": "1.4.6",
                    "angular-bootstrap": "^1.1.1",
            */
            BundleManager.CreateJsBundle("app",
                new JavascriptFile("~/content/components/angular/angular.min.js"),
                new JavascriptFile("~/content/components/angular-sanitize/angular-sanitize.min.js"),
                new JavascriptFile("~/content/components/angular-bootstrap/ui-bootstrap.min.js"),
                new JavascriptFile("~/scripts/app/controllers/SearchController.js"));
        }

        public void OnApplicationInitialized(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
        }

        public void OnApplicationStarting(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
        }
    }
}