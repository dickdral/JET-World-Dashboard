/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'text!./infocard.html', './infocard', 'text!./infocard.json', 'ojs/ojcomposite'],
  function(oj, view, viewModel, metadata) {
console.log('Infocard loader was called');
   oj.Composite.register('infocard',
    {
      metadata: {inline: JSON.parse(metadata)},
      view: {inline: view},
      viewModel: {inline: viewModel}
    });
  }
);

