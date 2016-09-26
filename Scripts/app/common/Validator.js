import "jquery-validation";

const Validator = function Validator(rules, messages) {
    if(!rules)
        console.log("rules can't be empty!");
    
    //validator's config
    let config = {
        rules: rules,
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    };

    //customize error message
    if (messages)
        config.messages = messages;

    $('form').validate(config);
}

export default Validator;