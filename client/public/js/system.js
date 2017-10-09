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
            $('input#_id').val( user_guid );
        }

        if (id === 'list-users') {
            listUsers();
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
                            '<div class="form-group">' +
                                '<div class="col-md-3"></div>' +
                                '<div class="col-md-3" role="group">' +
                                    '<button type="button" class="btn btn-success profile-save-button">Save</button>' +
                                '</div>' +
                                '<div class="col-md-3" role="group">' +
                                    '<button type="button" class="btn btn-danger profile-cancel-button">Cancel</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('.profile-save-button').click(() => {
            const values = {};
            values['name'] = $('input#name').val();
            values['_id'] = $('input#_id').val();
            values['email'] = $('input#email').val();
            values['phone'] = $('input#phone').val();
            values['address'] = $('input#address').val();
            values['role'] = $('input#role').val();

            let jsonData = JSON.stringify(values);

            if ( values['_id'] ) {              // UPDATE
                $.ajax({
                    url: '/api/v1/users/' + values['_id'],
                    method: "PUT",
                    contentType: "application/json",
                    data: jsonData,
                    success: (res) => {
                        console.log(res);
                    }
                });
            }
        });
    }

    function passwordUserForm() {
        systemSettings.innerHTML =
            '<div class="function-title">Change password for current user:</div>' +
                '<div class="function-settings" id="function-settings">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body form-horizontal payment-form">' +
                            '<input type="text" id="_id" name="_id" hidden>' +
                            '<div class="form-group">' +
                                '<label for="name" class="col-sm-3 control-label">Old password</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="password" class="form-control" id="old_password" name="old_password">' +
                                    '</div>' +
                                '</div>' +
                            '<div class="form-group">' +
                                '<label for="email" class="col-sm-3 control-label">New password</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="password" class="form-control" id="new_password" name="new_password">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="address" class="col-sm-3 control-label">Re-new password</label>' +
                                '<div class="col-sm-9">' +
                                    '<input type="password" class="form-control" id="renew_password" name="renew_password">' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<div class="col-md-3"></div>' +
                                '<div class="col-md-3" role="group">' +
                                    '<button type="button" class="btn btn-success password-save-button">Save</button>' +
                                '</div>' +
                                '<div class="col-md-3" role="group">' +
                                    '<button type="button" class="btn btn-danger password-cancel-button">Cancel</button>' +
                                '</div>' +
                            '</div>' +

                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('.password-save-button').click(() => {
            const values = {};
            values['_id'] = $('input#_id').val();
            values['old_password'] = $('input#old_password').val();
            values['new_password'] = $('input#new_password').val();
            values['renew_password'] = $('input#renew_password').val();

            let jsonData = JSON.stringify(values);
            if ( values['_id'] ) {              // UPDATE
                $.ajax({
                    url: '/api/v1/security/' + values['_id'],
                    method: "PUT",
                    contentType: "application/json",
                    data: jsonData,
                    success: (res) => {
                        console.log(res);
                    }
                });
            }
        });
    }

    function listUsers() {
        systemSettings.innerHTML =
            '<table id="table"' +
                'data-toggle="table"' +
                // 'data-height="362"' +
                'data-height="364"' +
                'data-url="api/v1/users"' +
                'data-search="true"' +
                'data-side-pagination="server"' +
                'data-pagination="true"' +
                'data-page-list="[5, 10, 20, 50]"' +
                '>' +
                '<thead>' +
                    '<tr>' +
                        // '<th data-field="_id">#</th>' +
                        '<th data-field="username" data-sortable="true">Name</th>' +
                        '<th data-field="email" data-sortable="true">E-mail</th>' +
                        '<th data-field="addedAt" data-sortable="true">Added At</th>' +
                        '<th data-field="role" data-sortable="true">Role</th>' +
                    '</tr>' +
                '</thead>' +
            '</table>'
            ;

        var $table = $('#table');
        $table.bootstrapTable();
    }
});

