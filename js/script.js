/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

var items = $('.student-item'),
    studentList = $('.student-list');

$(document).ready(function () {
    var items = $('.student-item'),
        studentList = $('.student-list');

    // This function takes a list and filters based on the index given in the function call. This is the function that is used when the pagination links are clicked

    function showItems(list, index) {
        for (var i = 0; i < list.length; i++) {
            if ((index - 1) * 10 <= i && ((index - 1) * 10) + 9 >= i) {
                list[i].style.display = "block";
            } else {
                list[i].style.display = "none";
            }
        }
    };

    function showNewItems(list, index) {
        for (var i = 0; i < list.length; i++) {
            if ((index - 1) * 10 <= i && ((index - 1) * 10) + 9 >= i) {
                list[i][0].style.display = "block";
            } else {
                list[i][0].style.display = "none";
            }
        }
    };

    // This function creates pagination links based on the length of the array that is provided in the argument, and the seach bar with no functionality. The number of items per page can be adjusted also. The first link is given the class active by default. This function also adds a click handler to each created pagination link.

    function appendPageLinks(list, itemsPerPage) {
        var pages = Math.ceil(list.length / itemsPerPage),
            page = $('.page'),
            pagination = $('.pagination'),
            paginationText = '',
            header = $('.page-header'),
            search = $('.student-search');
        if (pagination.length != 0) {
            pagination.remove();
        }
        paginationText += '<div class = "pagination"><ul>';
        for (var i = 0; i < pages; i++) {
            paginationText += '<li><a '
            if (i == 0) {
                paginationText += 'class = "active" '
            }
            paginationText += 'href = "#">' + (i + 1) + '</a></li>';
        }
        paginationText += '</ul></div><div class = "noResults" style = "display:none; text-align:center;">No Results!</div>';
        page.append(paginationText);
        if (search.length != 0) {
            search.remove();
        }
        header.append(`
        <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>
        `)
        $('.pagination ul li a').click(function (e) {
            var active = $('.active');
            active.toggleClass('active');
            $(this).toggleClass("active");
            console.log($(this).text())
            showItems(items, parseInt($(this).text()));
        });
    }

    function changePagination(list, itemsPerPage) {
        var pages = Math.ceil(list.length / itemsPerPage),
            page = $('.page'),
            pagination = $('.pagination'),
            paginationText = '';
        if (pagination.length != 0) {
            pagination.remove();
        }
        paginationText += '<div class = "pagination"><ul>';
        for (var i = 0; i < pages; i++) {
            paginationText += '<li><a '
            if (i == 0) {
                paginationText += 'class = "active" '
            }
            paginationText += 'href = "#">' + (i + 1) + '</a></li>';
        }
        paginationText += '</ul></div>';
        page.append(paginationText);
    }

    function searchFuntionality() {
        var searchBar = $('.student-search input'),
            searchButton = $('.student-search button'),
            studentItems = $('.student-item .student-details h3'),
            results;
        searchBar.keyup(function () {
            var value = searchBar.val(),
                newList = [];
            results = 0;
            $(studentItems).each(function () {
                if ($(this).text().toLowerCase().indexOf(value) > -1) {
                    newList.push($(this).parent().parent());
                    $(this).parent().parent().show();
                    results += 1;
                } else {
                    $(this).parent().parent().hide();
                }
            });
            console.log(results);
            changePagination(newList, 10);
            showNewItems(newList, 1);
            $('.pagination ul li a').click(function (e) {
                var active = $('.active');
                active.toggleClass('active');
                $(this).toggleClass("active");
                console.log($(this).text())
                showNewItems(newList, parseInt($(this).text()));
            });
            if (results == 0) {
                $('.noResults').show();
                } else {
                    $('.noResults').hide();
                }
        });
        searchButton.click(function () {

        });
    }

    showItems(items, 1);
    appendPageLinks(items, 10);
    searchFuntionality();

});
