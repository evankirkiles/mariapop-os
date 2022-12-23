/*
 * Localization.ts
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space,
 */

const LOCALE_TEXT: {[key: string]: string} = {
  "%game-intro"           : "Join the <strong>Angels</strong>!",
  "%restart-button"       : "Play Again",
  "%keep-playing-button"  : "Keep going",
  "%retry-button"         : "Retry",
  "%game-won"             : "You win!",
  "%game-over"            : "Game over!",
  "%game-explanation"     : "<strong class=\"important\">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same angel touch, they <strong>get promoted!</strong>",
  "%disclaimer"           : "<strong class=\"important\">Note:</strong> This site <a href=\"http://git.io/cupcakes\">git.io/cupcakes</a> is a spin-off of the official version of <a href=\"http://git.io/2048\">2048</a> created by <a href=\"http://gabrielecirulli.com\" target=\"_blank\">Gabriele Cirulli</a>.",
  "%credits"              : "Refurbished with love. For Masha.",
  "%tweet1"               : "I scored \"",
  "%tweet2"               : " at 2048-CUPCAKES #2048game",
  "%tile-legend"          : "<strong class=\"important\">Tile Legend:</strong>",
  '%2'                    : 'cauliflower',
  '%4'                    : 'cabbage',
  '%8'                    : 'sweet jerma',
  '%16'                   : 'LGBTQ+',
  '%32'                   : 'ethnically ambiguous',
  '%64'                   : 'liberal',
  '%128'                  : 'times square tourist',
  '%256'                  : 'bisexual ipad artist',
  '%512'                  : 'your friend has pretty eyes',
  '%1024'                 : 'FROGHAT',
  '%2048'                 : 'G.P.K-W-N',
  '%4096'                 : 't a k a n o !',
  '%8192'                 : 'y o s h i t o m o !',
  '%p0'                    : 'cauliflower',
  '%p4'                    : 'cabbage',
  '%p8'                    : 'sweet jerma',
  '%p16'                   : 'LGBTQ+',
  '%p32'                   : 'ethnically ambiguous',
  '%p64'                   : 'liberal',
  '%p128'                  : 'times square tourist',
  '%p256'                  : 'bisexual ipad artist',
  '%p512'                  : 'your friend has pretty eyes',
  '%p1024'                 : 'FROGHAT',
  '%p2048'                 : 'G.P.K-W-N',
  '%p4096'                 : 't a k a n o !',
  '%p8192'                 : 'y o s h i t o m o !',
}

export default function Localize(key: string) {
  var string = "%" + key;
  return LOCALE_TEXT[string];
}
