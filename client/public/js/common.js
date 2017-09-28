$(document).ready(function () {
    $(function(){
        let includes = $('[data-include]');
        jQuery.each(includes, function(){
            let file = $(this).data('include');
            $(this).load(file);
        });
    });

    $(".logout-btn").on('click', e => {
        e.preventDefault();
        $.ajax({
            url: '/logout',
            type: 'POST',
            data: {},
            success: (res) => {
                window.location.replace("/");
                location.reload();
            },
            error: (res) => {
                console.error(res);
            }
        });
    });
});