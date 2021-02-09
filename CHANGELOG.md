# Changelog

## [Unreleased](https://github.com/lislis/katharsis.lol/tree/HEAD)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.3.1...HEAD)

**Implemented enhancements:**

- \[ui\]\[admin\] add option to load introduction text from spreadsheet [\#57](https://github.com/lislis/katharsis.lol/issues/57)
- \[ui\] better indicate how the nickname is used [\#33](https://github.com/lislis/katharsis.lol/issues/33)
- \[ui\] add explanation view [\#19](https://github.com/lislis/katharsis.lol/issues/19)
- Logout user when user is deleted by mods [\#11](https://github.com/lislis/katharsis.lol/issues/11)

**Merged pull requests:**

- introtext from spreadsheet [\#69](https://github.com/lislis/katharsis.lol/pull/69) ([lislis](https://github.com/lislis))
- Add UI tests [\#68](https://github.com/lislis/katharsis.lol/pull/68) ([lislis](https://github.com/lislis))
- feat\(ui\) rm localstorage if user is deleted by admins [\#66](https://github.com/lislis/katharsis.lol/pull/66) ([lislis](https://github.com/lislis))
- Ticket codes [\#65](https://github.com/lislis/katharsis.lol/pull/65) ([lislis](https://github.com/lislis))
- add docs scaffold [\#58](https://github.com/lislis/katharsis.lol/pull/58) ([lislis](https://github.com/lislis))

## [v0.3.1](https://github.com/lislis/katharsis.lol/tree/v0.3.1) (2021-02-04)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.3.0...v0.3.1)

## [v0.3.0](https://github.com/lislis/katharsis.lol/tree/v0.3.0) (2021-02-03)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.2.3...v0.3.0)

**Implemented enhancements:**

- \[ui\]\[server\] distinguish between direct speech and descriptive text [\#41](https://github.com/lislis/katharsis.lol/issues/41)

**Merged pull requests:**

- feat\(ui\) Add switch direct speech \<-\> text to stage [\#56](https://github.com/lislis/katharsis.lol/pull/56) ([lislis](https://github.com/lislis))

## [v0.2.3](https://github.com/lislis/katharsis.lol/tree/v0.2.3) (2021-02-02)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.2.2...v0.2.3)

**Implemented enhancements:**

- \[ui\] people list who is online, who is on stage? [\#45](https://github.com/lislis/katharsis.lol/issues/45)
- \[ui\] rework notifications as modal [\#44](https://github.com/lislis/katharsis.lol/issues/44)
- \[ui\] multimedia [\#34](https://github.com/lislis/katharsis.lol/issues/34)
- \[ui\] fix scroll when user manually scrolls up [\#30](https://github.com/lislis/katharsis.lol/issues/30)
- \[ui\] unify notifications in ui [\#20](https://github.com/lislis/katharsis.lol/issues/20)

**Closed issues:**

- \[ui\] better highlight stage when you're on it  [\#43](https://github.com/lislis/katharsis.lol/issues/43)

**Merged pull requests:**

- feat\(ui, runner, server\) implement embed endpoint [\#55](https://github.com/lislis/katharsis.lol/pull/55) ([lislis](https://github.com/lislis))
- Add people list on who is on stage [\#54](https://github.com/lislis/katharsis.lol/pull/54) ([lislis](https://github.com/lislis))
- feat\(ui\) hightlight main stage when on it [\#53](https://github.com/lislis/katharsis.lol/pull/53) ([lislis](https://github.com/lislis))

## [v0.2.2](https://github.com/lislis/katharsis.lol/tree/v0.2.2) (2021-01-28)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.2.1...v0.2.2)

**Implemented enhancements:**

- \[ui\] emoji picker [\#47](https://github.com/lislis/katharsis.lol/issues/47)
- \[ui\] add service worker [\#39](https://github.com/lislis/katharsis.lol/issues/39)
- \[ui\] block message typing for \<amound of time\> after a message arrived [\#38](https://github.com/lislis/katharsis.lol/issues/38)
- \[ui\] indicate people typing [\#37](https://github.com/lislis/katharsis.lol/issues/37)
- \[ui\]\[runner\] indicate time left in section? [\#32](https://github.com/lislis/katharsis.lol/issues/32)
- \[ui\]\[server\] color code users [\#29](https://github.com/lislis/katharsis.lol/issues/29)
- \[socket\] implement delete-all message for chats  [\#25](https://github.com/lislis/katharsis.lol/issues/25)

**Fixed bugs:**

- \[server\] parse for \n and replace with \<br\> [\#48](https://github.com/lislis/katharsis.lol/issues/48)
- \[ui\] \[server\] empty messages still possible [\#27](https://github.com/lislis/katharsis.lol/issues/27)

**Merged pull requests:**

- other people typing indicator, closes \#37 [\#52](https://github.com/lislis/katharsis.lol/pull/52) ([lislis](https://github.com/lislis))
- colorcode users, close \#29 [\#51](https://github.com/lislis/katharsis.lol/pull/51) ([lislis](https://github.com/lislis))
- feat\(ui\) add emoji picker, closes \#47 [\#50](https://github.com/lislis/katharsis.lol/pull/50) ([lislis](https://github.com/lislis))
- feat\(ui\) hightlight linebreaks in chatoutput, close \#48 [\#49](https://github.com/lislis/katharsis.lol/pull/49) ([lislis](https://github.com/lislis))

## [v0.2.1](https://github.com/lislis/katharsis.lol/tree/v0.2.1) (2021-01-22)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.2...v0.2.1)

**Implemented enhancements:**

- \[ui\] create view when main rooms arent ready yet [\#13](https://github.com/lislis/katharsis.lol/issues/13)

**Fixed bugs:**

- \[socket\] user permissions not properly updated [\#26](https://github.com/lislis/katharsis.lol/issues/26)

## [v0.2](https://github.com/lislis/katharsis.lol/tree/v0.2) (2021-01-22)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/v0.1...v0.2)

**Implemented enhancements:**

- \[admin\] rewrite bulk delete options [\#24](https://github.com/lislis/katharsis.lol/issues/24)
- \[botbrain\] implement bulkdelete [\#23](https://github.com/lislis/katharsis.lol/issues/23)
- \[botbrain\] rewrite import scripts to use neat-csv, rm csv-parse [\#12](https://github.com/lislis/katharsis.lol/issues/12)

**Closed issues:**

- Make eslint pass [\#2](https://github.com/lislis/katharsis.lol/issues/2)

## [v0.1](https://github.com/lislis/katharsis.lol/tree/v0.1) (2021-01-20)

[Full Changelog](https://github.com/lislis/katharsis.lol/compare/a9f5321e36c86f359c9016d08c717508bd9967bf...v0.1)

**Implemented enhancements:**

- \[ui\] add proper intro view [\#17](https://github.com/lislis/katharsis.lol/issues/17)
- \[ui\] add spectator view [\#15](https://github.com/lislis/katharsis.lol/issues/15)
- Export script [\#10](https://github.com/lislis/katharsis.lol/issues/10)
- Moderation scripts [\#9](https://github.com/lislis/katharsis.lol/issues/9)
- Seed database [\#8](https://github.com/lislis/katharsis.lol/issues/8)

**Fixed bugs:**

- Stage links are not filled in prod [\#6](https://github.com/lislis/katharsis.lol/issues/6)

**Merged pull requests:**

- feat\(botbrain\) parse and sample words [\#7](https://github.com/lislis/katharsis.lol/pull/7) ([lislis](https://github.com/lislis))
- feat\(chat\): extend chat to allow open and private conversations  [\#1](https://github.com/lislis/katharsis.lol/pull/1) ([lislis](https://github.com/lislis))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
