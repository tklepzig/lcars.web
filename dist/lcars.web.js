'use strict';

var lcarsWeb = (function($, undefined) {
    var module = {};

    var defaultAudioId;
    var audioEnabled = true;
    var downEvent;
    var moveEvent;
    var upEvent;


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


    function adjustLabelSize() {
        $('.area.label').each(function() {
            var height = $(this).height();
            $(this).css('font-size', height + 'px');
            $(this).css('line-height', height + 'px');
        });
    }

    function adjustRoundRadius() {
        $('.area.round-l, .button.round-l').each(function() {
            var height = $(this).height();
            $(this).css('border-top-left-radius', height + 'px');
            $(this).css('border-bottom-left-radius', height + 'px');
            $(this).css('padding-left', (height / 2) + 'px');
        });

        $('.area.round-r, .button.round-r').each(function() {
            var height = $(this).height();
            $(this).css('border-top-right-radius', height + 'px');
            $(this).css('border-bottom-right-radius', height + 'px');
            $(this).css('padding-right', (height / 2) + 'px');
        });
    }

    $(window).on('resize', adjustLabelSize);
    $(adjustLabelSize);
    $(window).on('resize', adjustRoundRadius);
    $(adjustRoundRadius);

    module.defineAudioId = function(id, file, setAsDefault) {
        var $audio = $('<audio>').attr('id', 'audio-' + id).attr('preload', 'auto');
        $audio.append($('<source>').attr('src', name + '.wav').attr('type', 'audio/wav'));
        $audio.append($('<source>').attr('src', name + '.mp3').attr('type', 'audio/mpeg'));
        $('body').append($audio);

        if (setAsDefault) {
            defaultAudioId = id;
        }
    };

    module.removeAudioId = function(id) {
        $('#audio-' + id).remove();
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
            var $audio = $('#audio-' + id);
            if ($audio.length === 1) {
                $audio.get(0).play();
            }
        }
    };

    return module;
})(jQuery);
