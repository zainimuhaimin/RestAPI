function getMovies(){
    $('#listMovie').html("")
        let inputSearch = $('#searchInput').val()
            $.ajax({
            type: "get",
            url: "http://www.omdbapi.com/",
            data: {
                's' : inputSearch,
                'apikey' : '46b2a579'
            },
            dataType: "json",
            success: function (movies) {
                if (movies.Response === "True") {
                    let getMovies = movies.Search
                    $.each(getMovies, function (i, data) { 
                        $('#listMovie').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+data.Poster+`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                    <a href="#" class="card-link movieDetail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">See Detail</a>
                                </div>
                            </div>
                        </div>`)
                    });
                }else {
                    $('#listMovie').html(`<div><h1 class="text-center">`
                    +movies.Error+
                    `</h1></div`)
                }
            }
        });
        
    $('#searchInput').val("")
}

$('#searchButton').on('click', function(){
    getMovies()
})

$('#searchInput').keyup( function(e){
    if (e.which === 13) {
        getMovies()
    }
})

$('#listMovie').on('click', '.movieDetail', function(){
    let movieID = $(this).data('id')
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com/",
        data: {
            'i' : movieID,
            'apikey' : '46b2a579'
        },
        dataType: "json",
        success: function (detail) {
            if (detail.Response === "True") {
                $('.modal-body').html(`
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+detail.Poster+`" class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-8">
                            <h3>`+detail.Title+`</h3>
                            <p>Released : `+detail.Released+`</p>
                            <p>Genre : `+detail.Genre+`</p>
                            <p>Actors : `+detail.Actors+`</p>
                        </div>
                    </div
                </div>
            `)
            }
        }
    });
});

