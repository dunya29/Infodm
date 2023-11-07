@extends('layout.main')

<?php use \EvolutionCMS\Main\Helper; ?>

@section('mainContent')

    <main class="main">
        <section class="page applications">
            <div class="page__inner">
                <div class="page-header">
                    <h2>Заявки по дому</h2>
                    <h5>{{ $streetInfo['pagetitle'] ?? '' }}, дом {{ $houseInfo['pagetitle'] ?? '' }}</h5>
                </div>
                <div class="item-blocks">

                    @if(!empty($orders))
                        @foreach($orders as $item)
                    <a href="{{ $item['url'] }}" class="item-block">
                        <h4>{{ $item['pagetitle'] }}</h4>
                        <p>{!! $item['summary'] !!}</p>
                        <div class="item-block__footer">
                            <span class="item-block__date">{{ Helper::formatDate($item) }}</span>
                            @if(!empty($item['tv_order_status']) && !empty($orderStatuses[ $item['tv_order_status'] ]))
                            <span class="item-block__status {{ $item['tv_order_status'] }}">{{ $orderStatuses[ $item['tv_order_status'] ] }}</span>
                            @endif
                        </div>
                    </a>
                            @if(!empty($_SESSION['mgrRole']) && $_SESSION['mgrRole'] === 1)
                                <div class="contact_block">
                                    Заявитель: {{ $item['tv_contact_name'] }},
                                    номер квартиры: {{ $item['tv_flat_number'] }},
                                    контактный телефон: <a href="tel:{{ Helper::digits($item['tv_contact_phone']) }}">{{ $item['tv_contact_phone'] }}</a>
                                </div>
                            @endif
                        @endforeach
                    @endif
                    
                </div>
            </div>
            <div class="page__bottom">
                <a href="@makeUrl(48)?from={{ $documentObject['id'] }}" class="btn main-btn">Разместить заявку</a>
            </div>
        </section>
    </main>

@endsection
