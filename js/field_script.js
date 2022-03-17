function updateCorrespondingField() {
  const row = jQuery(this).parents("[class*='acf-row']").attr("data-id"),
        $localField = jQuery(`.local_field[name*='${row}']`)

  $localField.prop('disabled', true)
  jQuery.ajax({
    type: 'POST',
    dataType: 'json',
    url: backend.url,
    data:  `&group=${this.value}&action=field_of_group`,
    success: (data) => {
      $localField.prop('disabled', false)
      $localField.empty()
      data.forEach(({ label, name }) => $localField.append(`<option value="${name}">${label}</option>`))
    }
  })
}
jQuery(document).ready(() => {
  jQuery(".entity_field").change(updateCorrespondingField)
  new MutationObserver(() => {
    jQuery(".entity_field").off("change", updateCorrespondingField)
    jQuery(".entity_field").change(updateCorrespondingField)
  })
  .observe(document.querySelector(".acf-repeater.-table"), {
    childList: true,
    subtree: true
  })
})
