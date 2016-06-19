using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace System.Web.Mvc
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlString Email(this HtmlHelper helper, string email, string label = "", string message = "JavaScript is disabled, please enable to read this email address")
        {
            var regex = new Regex(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");

            if (!regex.Match(email).Success) return null;

            string[] parts = email.Split('@');
            string who = parts[0];
            string at = parts[1];

            if (string.IsNullOrWhiteSpace(label))
                label = email;

            var html = new StringBuilder();
            html.AppendFormat("<script>var who = '{0}', at = '{1}', e = who + '@' + at;document.write('<a href=\"mailto:'+e+'\">{2}</a>');</script>", who, at, label);
            html.AppendFormat("<noscript>{0}</noscript>", message);
            
            return new HtmlString(html.ToString());
        }

        public static IHtmlString StripTags(this HtmlHelper helper, string value, params string[] tags)
        {
            string stripped = value;
            foreach (var tag in tags)
            {
                stripped = Regex.Replace(value, "<[^>]p*>", "", RegexOptions.Multiline | RegexOptions.IgnoreCase);
            }
            return new HtmlString(stripped);
        }

        // public static IHtmlString Tel(this HtmlHelper helper, string number, int partsLength = 2)
        // {
        //     string prettyNumber = partsLength > 0 ? string.Join(" ", number.SplitParts(partsLength)) : number;
        //     string strippedNumber = number.Replace(" ", "");
        //     string s = string.Format("<a href=\"tel:{0}\">{1}</a>", strippedNumber, prettyNumber);
        //     return new HtmlString(s);
        // }

        // public static IHtmlString Tel(this HtmlHelper helper, string prefix, string number, int partsLength = 2)
        // {
        //     return new HtmlString(prefix + " " + Tel(helper, number, partsLength).ToString());
        // }
    }
}