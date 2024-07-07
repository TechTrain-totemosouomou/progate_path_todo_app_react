describe("TODO APP", () => {
  beforeEach(async () => {
    await page.goto(FRONT_URL);
    await new Promise(r => setTimeout(r, 1000));
  });

  test("get tasks", async () => {
    const title = await page.$eval('[data-test="task-title"]', el => {
      return (el as HTMLElement).innerText;
    });
    expect(title).toBe("breakfast");
  });

  test("add task", async () => {
    await page.type("[data-test=input-title]", "new todo");
    await page.click("[data-test=submit]");
    await new Promise(r => setTimeout(r, 100));
    const title = await page.$$eval('[data-test="task-title"]', els => {
      return (els[els.length - 1] as HTMLElement).innerText;
    });
    expect(title).toBe("new todo");
  });

  test("done task", async () => {
    await page.click("[data-test=tasks]>li:last-child .task_btn");
    await new Promise(r => setTimeout(r, 100));
    const className = await page.$eval("[data-test=tasks]>li:last-child .task_btn", el => {
      return (el as HTMLElement).getAttribute("class");
    });
    expect(className).toContain("done");
  });

  test("clear all done tasks", async () => {
    await page.click("[data-test=clear_btn]");
    await new Promise(r => setTimeout(r, 100));
    const doneTaskCount = await page.$$eval(
      ".task_btn.done",
      elements => elements.length
    );
    expect(doneTaskCount).toBe(0);
  });
});
