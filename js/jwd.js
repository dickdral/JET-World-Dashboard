/******************************************************
 * Display numbers readable
 *
 **********************/
function display_number(number)
{
  if ( number == undefined || number == null )
  { return(' '); }

  var sizes = [ {"base":1000,"symbol":"K"}
               ,{"base":1000000,"symbol":"M"}
               ,{"base":1000000000,"symbol":"G"}
               ,{"base":1000000000000,"symbol":"T"}
              ];
  var display = number.toString();
  
  for ( i in sizes )
  {
    if ( number > sizes[i].base ) 
    {
      num1 = number / sizes[i].base;
      if ( num1 < 10 ) { num2 = Math.round(num1*10)/10; }
      else { num2 = Math.round(num1); }
      // console.log(number, num1, num2);
      display = num2 + sizes[i].symbol;
    }
  }
  return(display);
}
/******************************************************
 * Drill-down functionality in Sunburst Chart
 *
 **********************/
function implement_drill()
{
   console.log('implement drill-down');
console.log($('svg').find('g[aria-label]') );
/* ('svg').find('g').has('text').each( function() {
  country = $(this).find('text').html();
  $(this).attr('onclick','alert(\''+country+'\');');
}); */
    
    $('svg g[cursor="pointer"]').has('text').click( function() {
      elem = $(this).find('text').html();
      id = countryId[elem];
      if ( id ) 
      { 
        apex.item('P1_COUNTRY_ID').setValue(id);
        console.log(elem+'='+id);
        apex.submit('DRILL');
      }
      else
          {
              console.log('Country '+elem+'not found');
          }
   });

}

