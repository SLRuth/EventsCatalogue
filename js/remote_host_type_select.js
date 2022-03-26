(($) => {
  const showConfiguration = ($select) => {
      const name = `${$select.val()}_configuration`;
      $(`[data-name*='configuration']`).hide()
      $(`[data-name='${name}']`).show()
  }
  $(document).ready(() => {
    const $typeSelect = $(".type-select")
    showConfiguration($typeSelect)
    $typeSelect.change(() => showConfiguration($typeSelect))
  })
})(jQuery)
