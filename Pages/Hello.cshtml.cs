using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ecohabits.Pages
{
    public class HelloModel : PageModel
    {
        public string RequestHost { get; private set; } = string.Empty;
        public string RemoteIpAddress { get; private set; } = "desconhecido";
        public string Timestamp { get; private set; } = string.Empty;

        public void OnGet()
        {
            RequestHost = HttpContext?.Request?.Host.Value ?? "desconhecido";
            RemoteIpAddress = HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "desconhecido";
            Timestamp = System.DateTime.UtcNow.ToString("o");
        }
    }
}