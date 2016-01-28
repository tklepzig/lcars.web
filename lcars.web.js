var lcarsWeb = (function($, undefined) {
    'use strict';

    function checkAudioSupport() {

        var audioElement = document.createElement('audio');

        if (audioElement.canPlayType('audio/mpeg')) {
            return 'mp3';
        } else if (audioElement.canPlayType('audio/wav')) {
            return 'wav';
        } else {
            return 'none';
        }
    }

    function getAudioFileFromId(id) {
        if (supportedAudioType === 'mp3') {
            return audioIds[id] + '.mp3';
        } else if (supportedAudioType === 'wav') {
            return audioIds[id] + '.wav';
        } else {
            return undefined;
        }
    }

    var module = {};

    var defaultAudioId;
    var audioEnabled = true;
    var downEvent;
    var moveEvent;
    var upEvent;
    var audioIds = {};
    var supportedAudioType = checkAudioSupport();


    if ('ontouchstart' in window) {
        downEvent = 'touchstart';
        moveEvent = 'touchmove';
        upEvent = 'touchend';
    } else if ('pointerdown' in window) {
        downEvent = 'pointerdown';
        moveEvent = 'pointermove';
        upEvent = 'pointerup';
    } else {
        downEvent = 'mousedown';
        moveEvent = 'mousemove';
        upEvent = 'mouseup';
    }

    $(document).on(downEvent, '.button:not(.disabled):not([disabled])', function() {
        if ($(this).is('[data-audio-id]')) {
            module.play($(this).attr('data-audio-id'));
        } else if (defaultAudioId !== undefined) {
            module.play(defaultAudioId);
        }
    });

    module.defineAudioId = function(id, file, setAsDefault) {
        audioIds[id] = file;

        if (setAsDefault) {
            defaultAudioId = id;
        }
    };

    module.removeAudioId = function(id) {
        delete audioIds[id];
    };

    module.isAudioEnabled = function() {
        return audioEnabled;
    };

    module.enableAudio = function() {
        audioEnabled = true;
    };

    module.disableAudio = function() {
        audioEnabled = false;
    };

    module.setDefaultAudioId = function(id) {
        defaultAudioId = id;
    };

    module.play = function(id) {
        if (audioEnabled) {
            var audioFile = getAudioFileFromId(id);
            if (audioFile !== undefined) {
                var audio = new Audio(audioFile);
                audio.play();
            }
        }
    };

    return module;
})(jQuery);
