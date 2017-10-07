$(document).ready(function () {
    $(function(){
        let includes = $('[data-include]');
        jQuery.each(includes, function(){
            let file = $(this).data('include');
            $(this).load(file);
        });
    });
});