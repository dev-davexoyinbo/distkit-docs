---
seo:
  title: distkit - Distributed systems primitives for Rust
  description: distkit is a Rust toolkit of distributed systems primitives backed by Redis - strict and lax counters, instance-aware counters, distributed locks, and rate limiting.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Distributed primitives for Rust, [backed by Redis]{.text-primary}.

#description
distkit gives you the building blocks distributed services keep reinventing - counters, instance-aware counters, locks, and rate limiting - behind small, async APIs that mirror the `std` and `tokio` types you already know. `#![forbid(unsafe_code)]`, no panics in library code.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  to: https://github.com/dev-davexoyinbo/distkit
  target: _blank
  variant: ghost
  color: neutral
  size: xl
  icon: i-simple-icons-github
  ---
  GitHub
  :::

  :::u-button
  ---
  to: https://crates.io/crates/distkit
  target: _blank
  variant: ghost
  color: neutral
  size: xl
  trailing-icon: i-lucide-external-link
  ---
  crates.io
  :::

#default
  ::u-card{class="divide-y divide-neutral-200/60 dark:divide-neutral-800/60"}
  :::prose-pre
  ---
  filename: Cargo.toml
  code: |
    [dependencies]
    distkit = "0.5"
  ---
  ```toml [Cargo.toml]
  [dependencies]
  distkit = "0.5"
  ```
  :::

  :::prose-pre
  ---
  filename: main.rs
  code: |
    use distkit::{DistkitRedisKey, counter::{StrictCounter, CounterOptions, CounterTrait}};

    let conn = redis::Client::open("redis://127.0.0.1/")?
        .get_connection_manager().await?;
    let prefix = DistkitRedisKey::try_from("my_app".to_string())?;

    let counter = StrictCounter::new(CounterOptions::new(prefix, conn));
    let key = DistkitRedisKey::try_from("page_views".to_string())?;
    counter.inc(&key, 1).await?;
  ---
  ```rust [main.rs]
  use distkit::{DistkitRedisKey, counter::{StrictCounter, CounterOptions, CounterTrait}};

  let conn = redis::Client::open("redis://127.0.0.1/")?
      .get_connection_manager().await?;
  let prefix = DistkitRedisKey::try_from("my_app".to_string())?;

  let counter = StrictCounter::new(CounterOptions::new(prefix, conn));
  let key = DistkitRedisKey::try_from("page_views".to_string())?;
  counter.inc(&key, 1).await?;
  ```
  :::
  ::
::

::u-page-section
#title
One toolkit, four primitives

#description
Each primitive is its own opt-in feature. Pull in only what you use - the core counters ship by default.

#features
  :::u-page-feature
  ---
  icon: i-lucide-hash
  to: /counters
  ---
  #title
  Counters
  #description
  Strict counters are atomic per call; lax counters buffer in memory and flush on an interval for sub-microsecond writes. Conditional and batch operations on both.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-network
  to: /instance-aware-counters
  ---
  #title
  Instance-aware counters
  #description
  Each instance owns a slice of the total. The cumulative is the sum of live instances, and dead instances are cleaned up automatically via heartbeats.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-lock
  to: /locks
  ---
  #title
  Distributed locks
  #description
  Redis-backed `Mutex` and writer-preferring `RwLock` that mirror `tokio::sync`. RAII guards, background lease renewal, and an awaitable `release()`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gauge
  to: /rate-limiting
  ---
  #title
  Rate limiting
  #description
  Sliding-window rate limiting via the trypema crate, re-exported under `distkit::trypema` with local, Redis, and hybrid providers.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Built to be predictable

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  Safe by default
  #description
  `#![forbid(unsafe_code)]` and no panics in library code. Errors surface through one `DistkitError` enum.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-scale
  ---
  #title
  Strict or lax, your call
  #description
  Choose immediate consistency when accuracy is critical, or buffered writes when throughput matters. Same trait, different guarantees.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Atomic where it counts
  #description
  Strict operations execute Lua scripts so a single Redis round-trip is atomic - no read-modify-write races across instances.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-recycle
  ---
  #title
  Self-cleaning background tasks
  #description
  Flush and lease-renewal tasks hold `Weak` references and stop on their own when the owning value is dropped.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Get started
      to: '/getting-started'
      trailingIcon: i-lucide-arrow-right
    - label: View on GitHub
      to: 'https://github.com/dev-davexoyinbo/distkit'
      target: _blank
      variant: subtle
      icon: i-simple-icons-github
  title: Ready to add distkit?
  description: Install the crate, point it at Redis, and reach for the primitive you need.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
