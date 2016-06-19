using System;
using System.Collections.Generic;
using System.Linq;

namespace ClientName.Web.Models
{
    public class PaginationModel
    {
        /// <summary>
        /// The current page.
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// Results per page.
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Total count of pages.
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Number of items to skip to reach current page results.
        /// </summary>
        public int Skips { get; private set; }

        public PaginationModel(int numberOfItems, int currentPage = 1, int pageSize = 10)
        {
            CurrentPage = currentPage <= 0 ? 1 : currentPage;
            PageSize = pageSize;
            Skips = (currentPage - 1) * pageSize;
            TotalPages = (int)Math.Ceiling((double)numberOfItems / pageSize);
        }
    }
}