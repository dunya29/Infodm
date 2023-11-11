@section('header')
        <!DOCTYPE html>
<html lang="ru">

<head>
    @include('partials.head')
</head>

<body>
<object style="display: none" class="sprite" type="image/svg+xml" data="html/img/icons/sprite.svg" title="Ваш браузер не поддерживает SVG"></object>
<div class="wrap">
    <!--header-->
    <header class="header">
        <div class="container">
                @switch(true)
                    @case($documentObject['template'] == 1)
                        <img src="html/img/logo.svg" alt="" class="header__logo">
                    @break

                    @case($documentObject['template'] == 13)
                        <a href="{{ $modx->makeUrl($documentObject['parent']) }}" class="header__back">
                            <svg><use xlink:href="html/img/icons/sprite.svg#chevron"></use></svg>
                            Все заявки
                        </a>
                    @break

                    @case($documentObject['template'] == 14)
                    <a href="{{ !empty($_GET['from']) && (int)$_GET['from'] > 0 ? $modx->makeUrl((int)$_GET['from']) : MODX_SITE_URL }}" class="header__back">
                        <svg><use xlink:href="html/img/icons/sprite.svg#chevron"></use></svg>
                        Назад к объявлениям
                    </a>
                    @break
                    @case($documentObject['template'] == 16)
                    <a href="{{ !empty($_GET['from']) && (int)$_GET['from'] > 0 ? $modx->makeUrl((int)$_GET['from']) : MODX_SITE_URL }}" class="header__back">
                        <svg><use xlink:href="html/img/icons/sprite.svg#chevron"></use></svg>
                        Назад к заявкам
                    </a>
                    @break

                    @default
                <a href="{{ MODX_SITE_URL }}" class="header__back">
                    <svg><use xlink:href="html/img/icons/sprite.svg#chevron"></use></svg>
                    На главную
                </a>
                    @break
                @endswitch
        </div>
    </header>
@show

@section('mainContent')

@show

@section('footer')
        <footer class="footer">
            <div class="container">
                @switch(true)
                    @case($documentObject['template'] == 1)
                        <div class="footer__info">
                            <span>По вопросам работы:</span>
                            <a href="https://{{ $modx->getConfig('client_tg') }}" target="_blank" rel="nofollow noopener noreferrer">{{ $modx->getConfig('client_tg') }}</a>
                        </div>
                    @break
                    @case(!empty($houseMenu))
                        <div class="footer__items">
                            @foreach($houseMenu as $item)
                            <a href="{{ $item['url'] }}" class="footer__item {{ in_array($item['id'], $activeBranch) ? 'active' : '' }}">
                                <svg><use xlink:href="html/img/icons/sprite.svg#{{ $item['link_attributes'] }}"></use></svg>
                                {{ $item['title'] }}
                            </a>
                            @endforeach
                        </div>
                        @break
                    @default
                        @break
                @endswitch
                
            </div>
        </footer>
</div>

@include('partials.footerScripts')

</body>

</html>
@show
