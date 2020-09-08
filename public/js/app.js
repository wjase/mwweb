
$(document).ready(function () {

    const appContainer = $('#app');
    const navContainer = $("#nav-bar")

    const md = new markdownit({
        html: true
    });
    // Router Declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            appContainer.html(path + 'not found:'+path);
            navTo("/about")
        },
    });

    const loadGallery = (src,gallery) =>{
        axios.get(src)
            .then(response => {
                gallery_path = src.replace(/\/[^\/]+$/,'')
                const galleryYML = response.data;
                var galleryDoc = jsyaml.load(galleryYML);
                console.dir(galleryDoc)
                var context = {
                    gallery_path:gallery_path,
                    images: galleryDoc
                };
            
                gallery.html(gallery_template(context))
                    // For gallery layout
                var $grid = $('.grid').imagesLoaded( function() {
                    // init Masonry after all images have loaded
                    $grid.masonry({
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                        });
                  });
                

            })
    };

    const navTo = (path) => {
        path = path.substr(path.lastIndexOf('/'));
        if (path == ""){
            path = "/about";
        }
        console.log('trying to nav to'+path)
        router.navigateTo(path);

    };

    const rewireLinks = (container)=>{
        $(container).find('a').on('click', (event) => {
            // Block browser page load
            event.preventDefault();
    
            // Highlight Active Menu on Click
            const target = $(event.target);
            $('.nav-link').removeClass('active');
            target.addClass('active');
    
            // Navigate to clicked url
            const href = target.attr('href');
            const path = href.substr(href.lastIndexOf('/'));
            if (path == ""){
                path = "/about";
            }
            router.navigateTo(path);
        });
    };

    const fetchMenu = (nav) => {
        axios.get('pages/menu.yaml')
            .then(response => {
                const menu = response.data;
                var doc = jsyaml.load(menu);
                nav.html(
                    doc.map((it) => {
                        return '<li class="nav-item"><a class="nav-link" href="/' + it.slug + '">' + it.item + '</a></li>'
                    }).join("\n")
                )

                doc.forEach(navItem => {
                    router.add('/' + navItem.slug, () => {
                        appContainer.html("loading...");

                        axios.get('pages/' + navItem.slug + '/index.md')
                            .then(response => {
                                const pageMarkdown = response.data;
                                const adjustedLinks = pageMarkdown.replace(/(data-src|src)="([^:>"]+)"/g,'$1="pages/'+navItem.slug+'/$2"')
                                rendered = md.render(adjustedLinks)
                                appContainer.html(rendered);
                                rewireLinks(appContainer);

                                var gallery = $('.gallery')
                                if(gallery.length){
                                    var src = gallery.attr( "data-src" )
                                    console.log(`source is ${src}`)
                                    loadGallery(src,gallery)
                                }
                            })
                    });
                });

                rewireLinks(navContainer);
                // Navigate app to current url
                navTo(window.location.pathname)
            })
            .catch(error => console.error(error))
            ;
    };

    fetchMenu(navContainer);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    // For gallery layout
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        horizontalOrder: true
    });

    var source = document.getElementById("gallery-template").innerHTML;
    var gallery_template = Handlebars.compile(source);
    


})



