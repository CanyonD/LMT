$(document).ready(function () {

    var tmpValues = null;
    var functionsList = document.getElementById("functions-list");

    var funсtionItemStyle = function (value) {
        return '<a href="#" class="list-group-item" id="functions-list-id-' + value._id + '">' +
                    '<h5 class="global-menu-item">' +
                        value.name +
                    '</h5>' +
                '</a>';
    };

    $.ajax({
        url: '/api/v1/functions',
        dataType:'json',
        success: function(names){
            tmpValues = names;
            names.forEach( function (item, index) {
                functionsList.innerHTML += funсtionItemStyle(item);
            });
        }
    });

    $(functionsList).click('click',function(e){
        $("#functions-list").find('*').removeClass("active");
        var id;
        if (e.target.id == '') {
            $(e.target.parentNode).addClass("active");
            id = e.target.parentNode.id;
        } else {
            $(e.target).addClass("active");
            id = e.target.id;
        }
        id = id.split('functions-list-id-')[1];
        if (id) {
            $.ajax({
                url: '/api/v1/functions/' + id,
                dataType:'json',
                success: function(values){
                    $('input#_id').val( values._id );
                    $('input#name').val( values.name );
                    $('input#description').val( values.description );
                    $('input#value').val( values.value );
                    $('input#default').val( parseInt(values.default) );
                }
            });
        }
    });

    $('.function-save-button').click(function(e){
        const values = {};
        values['name'] = $('input#name').val();
        values['description'] = $('input#description').val();
        values['value'] = $('input#value').val();
        values['default'] = parseInt($('input#default').val());
        values['_id'] = parseInt($('input#_id').val());
        console.log(values);

        var jsonData = JSON.stringify(values);

        if ( !isNaN(values['_id']) ) {
            $.ajax({
                url: '/api/v1/functions/' + values['_id'],
                method: "PUT",
                contentType: "application/json; charset=utf-8;",
                dataType: "json",
                data: jsonData,
                success: function (values) {
                    console.log(values);
                }
            });
        }
    });
});