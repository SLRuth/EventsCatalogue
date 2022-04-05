(($) => {
  const showConfiguration = ($select) => {
    const name = $select.val();
    if (name == "custom") $(`[data-name*='mapping']`).show()
    else $(`[data-name*='mapping']`).hide()
  }
  $(document).ready(() => {
    const $typeSelect = $("[data-name='schema'] select")
    showConfiguration($typeSelect)
    $typeSelect.change(() => showConfiguration($typeSelect))
  })
})(jQuery)
