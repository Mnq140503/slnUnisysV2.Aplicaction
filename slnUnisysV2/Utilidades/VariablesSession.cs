namespace slnUnisysV2.Utilidades
{
    public class VariablesSession
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VariablesSession(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        #region Variables de Session

        public string GetClaimValue(string claimType)
        {
            //HttpContext.User.FindFirst
            return _httpContextAccessor.HttpContext.User.FindFirst(claimType)?.Value;
        }

        public string IdUsuario => GetClaimValue("IdUsuario");

        public string UserName => GetClaimValue("UserName");

        public string IdCentro => GetClaimValue("IdCentro");
        //public async Task<string> IdUsuario()
        //{
        //    return await GetClaimValue("IdUsuario");
        //}

        //public async Task<string> UserName()
        //{
        //    return await GetClaimValue("UserName");
        //}

        #endregion
    }
}
