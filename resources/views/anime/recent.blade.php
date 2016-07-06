@extends('layouts.app')
@section('title', 'Recently Updated')

@section('content-center')
  <div class="content-section">
    <div class="section-heading">Recently Updated</div>
    <div class="section-body">
      <ul>
        @foreach($shows as $show)
          <li>
            <a href="{{ url("/anime/$show->id") }}">{{ $show->name }}</a>
            <ul>
              <li>{{ $show->alts }}</li>
              <li>{{ $show->description }}</li>
            </ul>
          </li>
          <br>
        @endforeach
      </ul>
    </div>
  </div>
@endsection
