@extends('layout.main')

<?php use \EvolutionCMS\Main\Helper; ?>

@section('mainContent')

    <main class="main">
        <section class="page application">
            <div class="page__inner">
                <div class="item-blocks dialog">
                    <div class="item-block is-out">
                        <h4>{{ $documentObject['pagetitle'] }}</h4>

                        {!! $documentObject['content'] !!}

                        @if(!empty($orderImages))
                        <div class="file-images">
                            <div class="file-images__row">
                                
                                @foreach($orderImages as $item)
                                <div data-src="{{ $item['image'] }}" class="media-cover" data-fancybox="application">
                                    <picture>
                                        <source srcset="{{ Helper::webp($item['image']) }}" type="image/webp">
                                        <img src="{{ $item['image'] }}" alt="">
                                    </picture>
                                </div>
                                @endforeach

                            </div>
                        </div>
                        @endif

                        @if(!empty($orderFiles))
                            @foreach($orderFiles as $item)
                        <div class="file-download">
                            {{ $item['filename'] }}
                            <a href="{{ $item['file'] }}" download><svg>
                                    <use xlink:href="html/img/icons/sprite.svg#download"></use>
                                </svg>
                            </a>
                        </div>
                            @endforeach
                        @endif

                        <div class="item-block__footer">
                            <div class="item-block__date">{{ Helper::formatDate($documentObject) }}</div>
                        </div>
                    </div>
                    
                    @if(!empty($orderHistory))
                        @foreach($orderHistory as $item)
                    <div class="item-block is-in">
                        @if(!empty($item['status']))
                        <h4 class="{{ $item['status'] }}">{{ $orderStatuses[ $item['status'] ] ?? 'Н/д' }}</h4>
                        @else
                        <h4>{{ $item['title'] }}</h4>
                        @endif
                        <p>{{ $item['text'] }}</p>
                        <div class="item-block__footer">
                            @if(!empty($item['date']))
                            <div class="item-block__date">{{ Helper::formatDate([ 'pub_date' => $item['date'] ]) }}</div>
                            @endif
                        </div>
                    </div>
                        @endforeach
                    @endif
                    
                </div>
                @if(!empty($documentObject['order_closed']))
                <p class="text-sm">Заявка закрыта. Если вы не согласны с результатом, пожалуйста обратитесь к управляющему</p>
                @else
                    @if(!empty($documentObject['orderText']))
                        <p class="text-sm">{{ $documentObject['orderText'] }}</p>
                    @endif
                @endif
            </div>
        </section>
    </main>

@endsection
