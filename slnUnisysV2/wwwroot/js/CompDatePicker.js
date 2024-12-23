$(document).ready(function () {
    $(".datepicker").each(function () {
        const $this = $(this);
        const options = {
            dateFormat: $this.data("dateformat") || "dd/mm/yy",
            minDate: $this.data("mindate") || null,
            maxDate: $this.data("maxdate") || null,
            showWeek: $this.data("showweek") === "true",
            firstDay: $this.data("firstday") || 0,
        };

        $this.datepicker(options);

        //// Validación visual para campos requeridos
        //$this.on("blur", function () {
        //    if ($this.hasClass("requerido") && !$this.val().trim()) {
        //        $this.css("border", "2px solid red").focus();
        //        toastr.warning("Este campo es obligatorio.");
        //    } else {
        //        $this.css("border", "");
        //    }
        //});
    });
});
