<!--Section: Contact v.2-->
<section class="mb-4" id='contact-form-submittedok' style="display:none">
    Your enquiry has been submitted. Thanks for getting in touch!<br/>
    <a href="/about">Click to return Home</a>
</section>
<section class="mb-4" id='contact-form-section'>
    <h1>Contact Us</h1>
    <!--Section description-->
    <div class="row">
        <!--Grid column-->
        <div class="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="#" method="POST">
                <!--Grid row-->
                <div class="row">
                    <!--Grid column-->
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <div id="name-error" class="error">&nbsp;</div>
                            <input type="text" id="name" name="name" class="form-control">
                            <label for="name" class="">Your name</label>
                        </div>
                    </div>
                    <!--Grid column-->
                    <!--Grid column-->
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <div id="email-error" class="error">&nbsp;</div>
                            <input type="text" id="email" name="email" class="form-control">
                            <label for="email" class="">Your email</label>
                        </div>
                    </div>
                    <!--Grid column-->
                </div>
                <!--Grid row-->
                <!--Grid row-->
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <div id="subject-error" class="error">&nbsp;</div>
                            <input type="text" id="subject" name="subject" class="form-control">
                            <label for="subject" class="">Subject</label>
                        </div>
                    </div>
                </div>
                <!--Grid row-->
                <div class="row">
                    <!--Grid column-->
                    <div class="col-md-12">
                        <div class="md-form">
                            <div id="message-error" class="error">&nbsp;</div>
                            <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                            <label for="message">Your message</label>
                        </div>
                    </div>
                </div>
                <div class="sm-form">
                    <input 
                    type="checkbox"  name="updates" id="updates" value="1">
                    <label 
                    for="updates" >Notify me about new updates</label>
                </div>
                <div class="clearfix" style="min-height: 1em;margin-bottom:1em;"> &nbsp; </div>  
                <div class="clearfix" style="min-height: 1em;"> &nbsp; </div>  
                <div class="row">
                    <!--Grid column-->
                    <div class="col-md-12">
                        <div class="md-form">
                            <div id='recaptcha'>&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div class="clearfix" style="margin-bottom:1em;"> &nbsp; </div>  
                <!--Grid row-->
                <div class="row">
                <div class="text-center text-md-left">
                    <div class="btn btn-primary" onclick="sendForm();">Send</div>
                </div>
                </div>
            </form>
            <script type="text/javascript">
                    if(typeof(grecaptcha)!='undefined'){
                    grecaptcha.render('recaptcha', {
                        'sitekey' : '6LduFd0nAAAAAIVXzaxl_jN1A9kkl_-WjojxESjy'
                        });
                    }
                    function sendForm(){
                        var form = ConvertFormToJSON($('#contact-form'));
                        if(validateForm(form)){
                            console.dir(form);
                        axios.post('/contactform')
                        .then(response => { 
                                if(response.status=200){
                                $('#contact-form-section').slideUp(); 
                                $('#contact-form-submittedok').slideDown();
                                }
                            })
                        }else{
                            console.log("invalid")
                        }
                    }
                    $("#contact-form input,textarea").on( "change", function() {
                        var form = ConvertFormToJSON($('#contact-form'));
                        validateForm(form);
                    });
                    function validateForm(form) {
                        console.log("About to validate...");
                        var result = true;
                        $(".error").html("");
                        if (form.name == "") {
                            $('#name-error').html("Name cannot be empty");
                            console.log("name empty");
                            result = false;
                        }
                        if (form.email == "") {
                            $('#email-error').html("Email cannot be empty");
                            result = false;
                        } else {
                            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!re.test(form.email)){
                                $('#email-error').html("Email format invalid");
                                result = false;
                            }
                        }
                        if (form.subject == "") {
                            $('#subject-error').html("Please provide a Subject");
                            result = false;
                        }
                        if (form.message == "") {
                            $('#message-error').html("Please provide a Message");
                            result = false;
                        }
                        return result;
}
// convert to JSON
function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    return json;
}
            </script>
                <div class="clearfix"> &nbsp; </div>  
        </div>
        <!--Grid column-->
    </div>
</section>
<!--Section: Contact v.2-->