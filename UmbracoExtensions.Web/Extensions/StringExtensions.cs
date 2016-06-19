using System.Collections.Generic;
using System.Linq;

namespace System.Web
{
    public static class StringExtensions {

        /// <summary>
        /// Splits a string into parts
        /// </summary>
        /// <param name="s">String to split into parts</param>
        /// <param name="length"Max length of the string parts</param>
        /// <returns></returns>
        public static IEnumerable<string> SplitParts(this string s, int length)
        {
            if (s == null)
                throw new ArgumentNullException("value");
            if (length <= 0)
                throw new ArgumentException("Part length has to be positive.", "length");

            for (var i = 0; i < s.Length; i += length)
                yield return s.Substring(i, Math.Min(length, s.Length - i));
        }

        /// <summary>
        /// Splits a string on specified devider and converts into a list
        /// </summary>
        /// <param name="s">Input that should be splitted.</param>
        /// <param name="divider">Charactor used to split input on.</param>
        /// <returns>Splitted string on specified char.</returns>
        public static IList<string> SplitToList(this string s, char divider = ',')
        {
            return s.Split(divider)
                .Select(f => f.Trim())
                .Where(f => !string.IsNullOrEmpty(f))
                .ToList();
        }
    }
}
