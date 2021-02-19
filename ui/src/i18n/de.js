import gdprCopy from './gdpr_de'

export default {
  index: {
    claim: "Ein Onlinewerkzeug für das gemeinsame Verfassen<br> der Theatertexte von morgen",
    defaultText: "Be excellent to each other!",
    watch: "Großer Saal",
    participate: "Bühneneingang",
  },
  intro: {
    enter: "Eintreten",
    yourNameIs: "Du trittst ein als",
    toRoom: "Gehe weiter",
    noMore: "Du willst nicht mehr?",
    leave: "Austreten",
    callMeByAnyName: "Bitte gib hier deinen Usernamen ein.<br>So wird auch deine Bühnenfigur gleich heißen!"
  },
  main: {
    pleaseWait: "Bitte warten"
  },
  user: {
    notice: {
      enter: "ist jetzt backstage.",
      leave: "has left the building."
    },
    notification: {
      onstage: "Auf die Bühne!",
      offstage: "Runter von der Bühne!",
      isMod: "Du bist jetzt Moderator:in",
      isUser: "Du bist jetzt Teilnehmer:in",
      wasRemoved: "Du wurdest gebeten zu gehen.",
      reallyLeave: "Willst du wirklich austreten?<br>Ohne einen neuen Ticketcode kannst du nicht mehr eintreten.",
      reallyLeaveBtn: "Austreten",
      back: "Hier bleiben"
    },
    status: {
      joinedAs: "„Willkommen, ",
      stage: "Auf der Bühne",
      mod: "Moderation"
    }
  },
  ui: {
    button: {
      toIndex: "Zum Start",
      close: "Schließen",
      send: "Schreiben",
      accept: "Okay!"
    },
    form: {
      chat: "Schreibe etwas",
      placeholderSpeech: "Was sagst du?",
      placeholderInstruction: "Was soll passieren?",
      thereIsTyping: "Es wird getippt",
      directSpeech: "Direkte Rede",
      stageInstruction: "Regieanweisung",
      langSwitch: "Sprache ändern"
    },
    chat: {
      scrollDown: "Neue Nachricht, scrolle runter",
      peopleList: {
        mod: "Moderation",
        backstage: "Bühne",
        stage: "Backstage"
      },
      emojiPicker: "Emoji auswählen"
    }
  },
  spec: {
    title: "Großer Saal"
  },
  part: {
    title: "Pforte",
    label: "Wer willst du sein?",
    ticket: "Ticketcode",
    invalidTicket: "Kein oder invalider Ticketcode!",
    usedTicket: "Ticketcode bereits genutzt!",
  },
  legal: {
    imprint: "Impressum",
    gdpr: "Datenschutzhinweise",
    gdprCopy: gdprCopy,
    gdprFurther: "Weitere Datenschutzhinweise der Administrierenden",
    gpdrLink: "Weitere Datenschutzhinweise der Administrierenden.",
    gpdrNoLink: "Keine weiteren Datenschutzhinweise der Administrierenden."
  }
}
