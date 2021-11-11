<template>
  <article>
    <OutSideNav />
    <header class="inner">
      <h1 class="part__title">{{ $t('part.title') }}</h1>
    </header>
    <section class="inner">
      <Notifications :notifications="$root.$data.notifications" />
      <div v-if="$root.$data.user.ticketCodeId">
        <p class="spacing-helper form-group__desc" >
          {{ $t('intro.ticketShown') }}<br>

          <template v-if="$root.$data.user.character?.name">
            {{ $t('intro.yesCharacter') }}<strong>{{$root.$data.user.character?.name}}</strong>.<br>
          </template>
          <router-link :to="{ name: 'main' }" class="btn btn--pill">{{ $t('intro.toRoom') }}</router-link>
          <template>
            {{ $t('intro.noCharacter') }}<br>
            <router-link :to="{ name: 'characterSheet' }" class="btn btn--pill">{{ $t('intro.toRoom') }}</router-link>
          </template>
        </p>
        <p class="spacing-helper form-group__desc">
          {{ $t('intro.noMore') }}
          <UserLogout class="link">{{ $t('intro.leave') }}</UserLogout>.
        </p>
      </div>
      <template v-else>
        <UserLogin />
      </template>
    </section>
  </article>
</template>
<script>
 import OutSideNav from '@/components/OutSideNav'
 import UserLogout from '@/components/UserLogout'
 import UserLogin from '@/components/UserLogin'
 import Notifications from '@/components/Notifications'

 export default {
   name: "Intro",
   components: {
     OutSideNav,
     UserLogout,
     UserLogin,
     Notifications
   }
 }
</script>
