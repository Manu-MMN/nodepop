
export function changeLocale(req, res, next) {
    const locale = req.params.locale

    //usamos una cookie en la respuesta
    res.cookie("nodeapp-locale", locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 //30 días
    })

    res.redirect("back")
}