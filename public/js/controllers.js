/**
 * Created with JetBrains WebStorm.
 * User: peter
 * Date: 18/08/13
 * Time: 3:14
 * To change this template use File | Settings | File Templates.
 */
app.controller('fichaCtrl', function ($rootScope) {
    $rootScope.tiradas = tiradas(8);

    $rootScope.navType = 'tabs';
    $rootScope.ficha = reseteaficha();
    $rootScope.tira = function(){tira($rootScope)};
    $rootScope.tirarand = function(){tirarand($rootScope)};
    $rootScope.actualizaINT = function(){actualizaINT($rootScope)};


    $rootScope.actualizaPOD = function(){actualizaPOD($rootScope)};

    $rootScope.actualizaEDU = function(){actualizaEDU($rootScope)};

    $rootScope.actualizaTAM = function () {
        calculapv($rootScope);
        calculabd($rootScope);
    };
    $rootScope.actualizaFUE = function () {
        calculabd($rootScope);
    };
    $rootScope.actualizaCON = function () {
        calculapv($rootScope);
    };
});

function calculapv($scope) {
    $scope.ficha.pv = Math.ceil((Number($scope.ficha.TAM) + Number($scope.ficha.CON)) / 2);
}

function calculabd($scope) {
    var ret = "-";
    var val = Number($scope.ficha.TAM) + Number($scope.ficha.FUE);
    if (val <= 12) {
        ret = "-1d6";
    } else if (val <= 16) {
        ret = "-1d4";
    } else if (val <= 24) {
        ret = "0";
    } else if (val <= 32) {
        ret = "+1d4";
    } else if (val <= 40) {
        ret = "+1d6";
    } else if (val > 40){
        ret = "Masivo (" + val + ")";
    }
    $scope.ficha.bd = ret;
}

function tirada() {
    var subtiradas = new Array(3);
    for (var count = 1; count <= 4; count = count + 1) {
        subtiradas[count] = Math.floor(Math.random() * 6 + 1);
    }
    var tiradasord = subtiradas.sort(function (a, b) {
        return b - a;
    });
    var total = 0;
    for (var i = 0; i <= 2; i++)
        total += tiradasord[i];
    return total;
}

function tiradas(n) {
    var mistiradas = new Array(n);
    for (var count = 0; count < n; count = count + 1) {
        mistiradas[count] = tirada();
    }
    return mistiradas;
}

function tira($scope) {
    $scope.tiradas = tiradas(8);
    $scope.ficha = reseteaficha($scope);
}

function tirarand($scope) {
    $scope.ficha = {
        FUE: tirada(),
        DES: tirada(),
        INT: tirada(),
        idea: 0,
        CON: tirada(),
        APA: tirada(),
        POD: tirada(),
        suerte: 0,
        TAM: tirada(),
        COR: 0,
        EDU: tirada(),
        conocimientos: 0,
        cormax: 99,
        bd: 0,
        pv: 0,
        pm: 0,
        ph: 0,
        pi: 0,
        edad: 0,
        ahorros: 0
    }
}

function actualizaINT($scope) {
    $scope.ficha.idea = Math.min(99, $scope.ficha.INT * 5);
    $scope.ficha.pi = $scope.ficha.INT * 10;
    $scope.tabs[1].disabled = formficha.$invalid;
}
function actualizaPOD($scope) {
    $scope.ficha.suerte = Math.min(99, $scope.ficha.POD * 5);
    $scope.ficha.COR = Math.min(99, $scope.ficha.POD * 5);
    $scope.ficha.pm = $scope.ficha.POD;
}

function actualizaEDU($scope) {
    $scope.ficha.EDU += 3;
    $scope.ficha.conocimientos = Math.min(99, $scope.ficha.EDU * 5);
    $scope.ficha.ph = $scope.ficha.EDU * 20;
    $scope.ficha.edad = Number($scope.ficha.EDU) + 6;
}

function reseteaficha(){
    var ficha = {
        FUE: 0,
        DES: 0,
        INT: 0,
        idea: 0,
        CON: 0,
        APA: 0,
        POD: 0,
        suerte: 0,
        TAM: 0,
        COR: 0,
        EDU: 0,
        conocimientos: 0,
        cormax: 99,
        bd: 0,
        pv: 0,
        pm: 0,
        ph: 0,
        pi: 0,
        edad: 0,
        ahorros: 0
    }
    return ficha;
}
