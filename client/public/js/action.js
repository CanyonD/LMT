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
        url: '/assets/test.json',
        dataType:'json',
        success: function(names){
            tmpValues = names;
            names.forEach( function (item, index) {
                functionsList.innerHTML += funсtionItemStyle(item);
            });
        }
    });

    $(functionsList).click('click',function(e){
        $(".list-group list-group-item").removeClass("active");
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
            console.log( id );
            $.ajax({
                url: '/assets/test_once.json',
                dataType:'json',
                success: function(values){
                    var form_data = {};
                    form_data["name"] = $('.payment-form input[name="name"]').values.name;
                    form_data["description"] = $('.payment-form input[name="description"]').values.description;
                    form_data["value"] = $('.payment-form input[name="value"]').values.value;
                    form_data["default_value"] = parseFloat($('.payment-form input[name="default_value"]').val()).toFixed(2);

                }
            });
        }
    });


    $(function(){
        $('.preview-add-button').click(function(){
            var form_data = {};
            form_data["concept"] = $('.payment-form input[name="concept"]').val();
            form_data["description"] = $('.payment-form input[name="description"]').val();
            form_data["amount"] = parseFloat($('.payment-form input[name="amount"]').val()).toFixed(2);
            form_data["status"] = $('.payment-form #status option:selected').text();
            form_data["date"] = $('.payment-form input[name="date"]').val();
            form_data["remove-row"] = '<span class="glyphicon glyphicon-remove"></span>';
            var row = $('<tr></tr>');
            $.each(form_data, function( type, value ) {
                $('<td class="input-'+type+'"></td>').html(value).appendTo(row);
            });
            $('.preview-table > tbody:last').append(row);
            calc_total();
        });
    });

});