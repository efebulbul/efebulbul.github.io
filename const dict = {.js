const dict = {
  tr: { hello:"Merhaba", role:"Frontend Geliştirici" },
  en: { hello:"Hello", role:"Frontend Developer" }
};
const LangContext = React.createContext();

function LangProvider({children}) {
  const [lang, setLang] = React.useState("tr");
  const t = (k) => (dict[lang] && dict[lang][k]) || k;
  const value = React.useMemo(()=>({lang, setLang, t}), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function LangSwitch() {
  const {lang, setLang} = React.useContext(LangContext);
  return (
    <button className="btn" onClick={()=>setLang(lang==="tr"?"en":"tr")}>
      {lang==="tr" ? "EN" : "TR"}
    </button>
  );
}

function HeroTitle() {
  const {t} = React.useContext(LangContext);
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>{t("hello")}</h2>
      <p className="subtitle">{t("role")}</p>
    </div>
  );
}
