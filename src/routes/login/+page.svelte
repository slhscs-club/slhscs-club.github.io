<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
</script>

<svelte:head>
  <title>Login | SLHS CS Club</title>
  <meta name="description" content="Login to the Seven Lakes High School Computer Science Club web portal." />
</svelte:head>

<Shell activePage="login">
  <PageHero title="Web Portal" subtitle="Login to access club resources, manage your profile, and more. This feature is coming soon." />

  <section class="section">
    <div class="login-card">
      <div class="login-form">
        <h2 class="section-title">Sign In</h2>
        <p>Portal login is not yet available. Check back later!</p>
        <a class="btn btn-primary" href="/"><i class="fa-solid fa-house"></i> Back Home</a>
      </div>
    </div>
  </section>
</Shell>

<style>
  .login-card {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
    text-align: center;
  }

  .login-form {
    display: grid;
    gap: 1.5rem;
    justify-items: center;
  }
</style>