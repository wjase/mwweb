jQuery(function () {

    const appContainer = $('#app');
    const navContainer = $("#nav-bar")

    const md = new markdownit({
        html: true
    });

    const loadAsyncImages = () => {

        console.log("load async images")
        var objects = $('.asyncImage')
        objects.each(function() {
            const eachImage = $(this)
            console.dir(this)
            console.dir({'img':eachImage.attr('src')})
            // Start loading image
            const img = new Image();
            const lgUrl = eachImage.attr('src').replace('_sm','_lg')
            img.src = lgUrl
            // Once image is loaded replace the src of the HTML element
            img.onload = () => {
                eachImage.removeClass('asyncImage');
                return eachImage[0].nodeName === 'IMG' ?
                    $(eachImage).attr('src', lgUrl):
                    $(eachImage).css('backgroundImage',`url(${lgUrl})`)
            };
        });

    }

    // Router Declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            appContainer.html(path + 'not found:' + path);
            navTo("/about")
        },
    });

    const loadGallery = (src, gallery) => {
        axios.get(src)
            .then(response => {
                gallery_path = src.replace(/\/[^\/]+$/, '')
                const galleryYML = response.data;
                var galleryDoc = jsyaml.load(galleryYML);
                var context = {
                    gallery_path: gallery_path,
                    images: galleryDoc
                };

                gallery.html(gallery_template(context))
                // For gallery layout
                var $grid = $('.grid').imagesLoaded(function () {
                    // init Masonry after all images have loaded
                    $grid.masonry({
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                    });
                    loadAsyncImages();
                });

            })
    };

    const navTo = (path) => {
        path = path.substr(path.lastIndexOf('/'));
        if (path == "") {
            path = "/about";
        }
        console.log('trying to nav to' + path)
        router.navigateTo(path);

    };

    const rewireLinks = (container) => {
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
            if (path == "") {
                path = "/about";
            }
            router.navigateTo(path);
        });
        loadAsyncImages();
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
                                const adjustedLinks = pageMarkdown.replace(/(data-src|src)="([^:>"]+)"/g, '$1="pages/' + navItem.slug + '/$2"')
                                rendered = md.render(adjustedLinks)
                                appContainer.html(rendered);
                                rewireLinks(appContainer);

                                var gallery = $('.gallery')
                                if (gallery.length) {
                                    var src = gallery.attr("data-src")
                                    loadGallery(src, gallery)
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
    var grid = $('.grid')

    if(grid.length>1){
        grid.masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: true
        });
    }else{
        loadAsyncImages();
    }   

    var source = document.getElementById("gallery-template").innerHTML;
    var gallery_template = Handlebars.compile(source);


})




