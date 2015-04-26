using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESOnline2.WebUI.Controllers
{
    public class JsonResponse
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public IEnumerable<JsonValidationError> Errors { get; set; }

        public JsonResponse()
        {
            Errors = new List<JsonValidationError>();
        }
    }
}
