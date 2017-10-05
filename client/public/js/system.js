$(document).ready(function () {
    let systemList = document.getElementById("system-list");
    let systemSettings = document.getElementById("system-settings");

    $(systemList).click('click',(e) => {
        $("#system-list").find('*').removeClass("active");
        let id;
        if (e.target.id === '') {
            $(e.target.parentNode).addClass("active");
            id = e.target.parentNode.id;
        } else {
            $(e.target).addClass("active");
            id = e.target.id;
        }
        id = id.split('system-')[1];
        let user_guid = $.cookie("user_guid").split('j:')[1].slice(1, -1);

        if (id === 'edit') {
            $.ajax({
                url: '/api/v1/users/' + user_guid,
                dataType: 'json',
                success: (values) => {
                    editUserForm();
                    $('input#_id').val( values._id );
                    $('input#name').val( values.username );
                    $('input#email').val( values.email );
                    $('input#phone').val( values.phone );
                    $('input#address').val( values.address );
                    $('input#role').val( values.role );
                }
            });
        }

        if (id === 'password') {
            passwordUserForm();
        }
    });


    function editUserForm() {
        systemSettings.innerHTML =
            '<div class="function-title">Edit user profile:</div>' +
                '<div class="function-settings" id="function-settings">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body form-horizontal payment-form">' +
                            '<input type="text" id="_id" name="_id" hidden>' +
                            '<div class="form-group">' +
                                '<label for="name" class="col-sm-3 control-label">Name</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="name" name="name">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="email" class="col-sm-3 control-label">Email</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="email" name="email">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="address" class="col-sm-3 control-label">Address</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="address" name="address">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="phone" class="col-sm-3 control-label">Phone</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="phone" name="phone">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="role" class="col-sm-3 control-label">Role</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="role" name="role">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    function passwordUserForm() {
        systemSettings.innerHTML =
            '<div class="function-title">Change password for user:</div>' +
                '<div class="function-settings" id="function-settings">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body form-horizontal payment-form">' +
                            '<input type="text" id="_id" name="_id" hidden>' +
                            '<div class="form-group">' +
                                '<label for="name" class="col-sm-3 control-label">Old password</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="text" class="form-control" id="name" name="name">' +
                                    '</div>' +
                                '</div>' +
                            '<div class="form-group">' +
                            '<label for="email" class="col-sm-3 control-label">New password</label>' +
                            '<div class="col-sm-9">' +
                            '<input type="text" class="form-control" id="email" name="email">' +
                            '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                            '<label for="address" class="col-sm-3 control-label">Re-new password</label>' +
                            '<div class="col-sm-9">' +
                            '<input type="text" class="form-control" id="address" name="address">' +
                            '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

});

