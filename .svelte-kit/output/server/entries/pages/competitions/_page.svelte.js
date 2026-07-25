import { a4 as head } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
function _page($$renderer) {
  head("wujwz1", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Competitions | SLHS CS Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Competitions run by the Seven Lakes High School Computer Science Club."/>`);
  });
  Shell($$renderer, {
    activePage: "competitions",
    children: ($$renderer2) => {
      $$renderer2.push(`<section class="section comp-hero svelte-wujwz1"><div class="container"><h1 class="page-title">Competitions</h1> <p class="page-subtitle svelte-wujwz1">Information about the contests we run and attend.</p></div></section> <section class="section"><div class="container"><h2 class="section-title">Local Contests</h2> <p>We attend several local computer science contests throughout the year hosted by neighboring schools. Teams of 3 program on one computer to complete a packet of programming problems (while eating pizza and candy). They're a fun way to spend a Saturday and improve your problem solving skills.</p> <div class="contest-list svelte-wujwz1"><div class="contest-card color-orange svelte-wujwz1"><h3 class="svelte-wujwz1">HP Code Wars</h3> <p class="svelte-wujwz1">Annual contest hosted by Hewlett Packard</p></div> <div class="contest-card color-orange svelte-wujwz1"><h3 class="svelte-wujwz1">USACO</h3> <p class="svelte-wujwz1">USA Computing Olympiad - online contests throughout the year</p></div> <div class="contest-card color-orange svelte-wujwz1"><h3 class="svelte-wujwz1">UIL CS</h3> <p class="svelte-wujwz1">University Interscholastic League - we frequently advance to State</p></div> <div class="contest-card color-orange svelte-wujwz1"><h3 class="svelte-wujwz1">Local School Contests</h3> <p class="svelte-wujwz1">Hosted by nearby schools, in the district or otherwise</p></div></div></div></section> <section class="section national-band svelte-wujwz1"><div class="container"><h2 class="section-title">Annual October Contest</h2> <p>Every year our annual October contest is hosted online and in-person with over 350 people in attendance. The contest is produced entirely by the CS Club and every year we need problem writers, testers, judges, and other volunteers to help put the event together.</p> <p class="mono-text svelte-wujwz1">View our contest schedule <a href="https://www.apluscompsci.com/cs_cont_list.htm" target="_blank" rel="noopener noreferrer" class="svelte-wujwz1">here</a>.</p></div></section> <section class="section"><div class="container cta-card color-orange svelte-wujwz1"><h2 class="section-title svelte-wujwz1">CP Practice</h2> <p class="section-lead svelte-wujwz1">We hold competitive programming practice every week. Come learn and improve.</p> <div class="cta-actions svelte-wujwz1"><a class="btn btn-primary" href="/calendar"><i class="fa-solid fa-calendar"></i> See Schedule</a> <a class="btn btn-secondary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a></div></div></section>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
