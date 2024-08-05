# A Traveler’s Guide to the Latent Space

Written by: [Ethan Smith](https://www.ethansmith2000.com/)

Edited and Made Presentable by: [**Juan Lam**](https://juanlam.com/)

Who helped turn my ramblings into this beautiful guide.

I also want to thank our amazing developers for all their work: **Somnai, Gandamu, Dango,** and **Katherine Crowson.**

And made possible by the experiments and findings of **Lowfuel**, **KyrickYoung**, and many others. 

If you find this useful, or want to support my various experiments and deep dives into Disco Diffusion, consider supporting me on [**Patreon](https://www.patreon.com/user?u=74253459).** It would be a great help in covering GPU rental costs and allowing me to do more experiments and provide more resources like these. Alternatively, if you want to get in on the action yourself, I’ve made a **sign-off spreadsheet** of a bunch of ideas for experiments, as well as added a section on this guide on **how to do a good study.** There are a massive number of things to try and test and experiment with in just Disco Diffusion alone, which makes the possibilities endless — and that’s part of the fun.

Any questions, comments, or feedback, feel free to message me on discord: **ethansmith2000#1332**

**Other useful links**

**Master List of neat AI tools, ai upscalers, all sorts of goodies: https://pharmapsychotic.com/tools.html**

**EZ Charts Wiki - Study database**

[**https://ezcharts.miraheze.org/wiki/EZ_Charts**](https://ezcharts.miraheze.org/wiki/EZ_Charts)

Anyways, here’s the guide!

**PDF VERSION:** https://drive.google.com/file/d/1PuHasikqKcrCuc8V_-LVpk2CpwiOLGL6/view?usp=sharing

---

# **Table of Contents**

# Introduction

![image39.jpg](/images/blog_posts/rvc_1/cover_img.png)

*We are in a very interesting time right now where the growth of AI is exponential, and its usage is becoming more and more mainstream. The open-source nature of these projects has attracted a lot of great minds and fostered the exchange of knowledge that has let us improve so rapidly. I believe that’s part of why OpenAI released  their work to the public: to see what we could make of them. I’ve come to find that artificial intelligence studies is a very multidisciplinary field, and there’s a place (if not need) for all kinds of skillsets. The way I like to think of it is that, although the inventors of the car probably know its inner-workings better than anyone else, that doesn’t necessarily mean they immediately know how to drive. Likewise, a professional race-car driving capable of rounding turns at 200 miles per hour may not know how to change a tire. Similarly there are multiple schools of thought that go along with AI, and I believe all are critical to its success. Whether it’s designing program architecture or evaluating bias through linguistic studies or even studying its depiction of historical art movements, there is truly a place for everyone to contribute. And in return, when making use of a program with near infinite possibilities, I have no doubt you’ll find something that interests you.*

**Greetings fellow adventurer of the Latent Space!**

Whether you’re new to AI, or quite experienced with Disco, I think this guide will be of good use to you. This guide was designed as a response to the most frequent questions I’ve been asked by the AI Art community: “What’s the prompt?” “What are the settings?”

I created this guide because I believe that sharing knowledge is important — there’s just too much ground to cover for anybody to figure things out on their own. However, I don’t believe in just copying and pasting the work of others. When we make AI Art, we’re all pulling from the same datasets (unless you’ve curated your own), and the interpretation of what a prompt should look like is ultimately left up to the machine. As such, the only things that separate our work from that of others is our prompts, and our settings. Assuming no post processing, those three things are really it. For that reason, I understand why some AI Artists in the community aren’t open to sharing information.

With that said, I believe generating art with AI is a very individual journey. You should explore and discover what the latent space has to offer on your own to get the most out of the experience and to truly stand out. My goal with this guide is not to give the ultimate settings (partially as that doesn’t exist and everyone will have a different opinion), but to give you a sense of what does and doesn’t work to make awesome images, as well as to give you the tools to explore it yourself. When I first got my hands on this tech, it was at a point that a lot of us were pretty left in the dark about how to go about it. So it all relied on a group effort to experiment from square one and exchange knowledge with each other to make use of our limited time and resources. Shoutout to u/relaxedorange for starting the subreddit, on [**this post**](https://www.reddit.com/r/bigsleep/comments/snw2nl/the_serpent_headed_god_the_great_serpent_disco/) that started it all**.** It took a lot of time to get to the level I am at today, but I hope with this guide I can get you started at the 50% mark, and then give you everything you need to find out what your 100% looks like. I would like to note that my knowledge of the actual code and science that goes into all of this is definitely far less than those who do this thing for a living (and certainly less than the developers), but I like to think I understand I get the necessary concepts. With what I do know, I hope to give an easy-to-understand ELI5 (explain like I’m 5 years old) sort of explanation. This guide is chock full of experiments and comparisons of different prompts and parameters and I think that’s the best way to learn all this, because really, a picture is worth a thousand words. Some of the definitions and intended purpose of the settings aren't fully accurate so what better way to understand what it than to see it in action?

This guide is designed for Disco Diffusion, but much of it should apply to other Clip Guided Diffusion notebooks like JAX Diffusion and possibly Majesty/Princess Diffusion (don’t have as much experience with Majesty). It works both as a start-to-finish read through and a library of resources to find that one setting or experiment you’re looking for (you can use the [**Table of Contents](https://www.notion.so/A-Traveler-s-Guide-to-the-Latent-Space-85efba7e5e6a40e5bd3cae980f30235f?pvs=21)** or **ctrl/command + f** to search through the guide quickly).

This guide is very much a work in progress. There are some parts I’m pretty proud of and some that definitely need some work. I will be updating as more is discovered, and if you have something to offer or see something that needs to be fixed, never hesitate to reach out. I may or may not be able to include it just as this guide has become overwhelmingly large as it is, but I always love to hear findings. After all, I’d like to make this document a community effort as that’s exactly what so much of it is built off of. 

*PS: I have also made my own custom notebook which largely contains the code of DDv5.2 but with some modifications that allow some extra freedom with settings + a few mods to play with. It is the product of modded notebooks others have released with some repurposed bits of code I found by scavenging the Internet. I do not recommend it for beginners as it will only make things more complex*

*As of right now I do not plan to update it to 5.4 as the only changes are animation things as well as the transformation symmetry method, (the one on mine uses a different, gentler method). But I may see about updating it in the future. Nevertheless, I will be regularly adding features to it that I find worth playing with.*

## Getting Started with Disco Diffusion

**(On Google Colab)**

Unless you have some other way of running Disco, you’re probably going to be running it through Google Colab, which is a neat way to run a raw piece of code with the help of borrowed computation. DD and many other AI programs require a strong GPU to function, so that’s why Colab is the optimal way to go about this at the moment. It’s also compatible with Google Drive, which allows you to automatically save your outputs to the cloud.

<aside>
💡 **Here’s the official DD notebook: https://colab.research.google.com/github/alembics/disco-diffusion/blob/main/Disco_Diffusion.ipynb**

</aside>

However, this is a *view only* kind of notebook, so it’s best to **save a copy to your drive** so that it will save your edits.

At first glance, a Colab notebook can be a bit intimidating, what with all the parameters and checkboxes, especially if you’re not as accustomed with coding stuff.  However, DD is one of the most user friendly Colab notebooks I’ve used (believe me, there’s worse) and I think you’ll get comfy with it pretty quickly. Starting from the top, we’ll check out the toolbar and the other basic functions of Colab notebook. You won’t have to touch 90% of it, but there’s a few things worth being familiar with.

The next few pages are a quick-start guide. But here are two videos that do a good job of walking you through it.

**Quick setup: [Quick Disco Diffusion Setup Guide](https://www.youtube.com/watch?v=MJ_I9TCXWos)**(2:43)

**More Detailed version: [Image Generation with CLIP + Diffusion models (Disco Diffusion 4.1)](https://www.youtube.com/watch?v=Dx2G940Pao8)** (21:36)

![image17.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b965925-4946-4e9f-9594-69fb92c94e27/image17.png)

*(I’ve gone ahead and crossed out every button you won’t need)*

Looking at the **File** section, you’ll see some options to save your notebook, rename it, trash it. Basically, all the same stuff you see in Microsoft Word or any other text editor.

In the **View** section, you’ll see some ways you can look at the table of contents so you can navigate to different sections of the notebook, but as this notebook is pretty small, scrolling up/down works too.

**Runtime.** This one’s important. There are two main buttons here that are going to come in handy. **Run all** and **Disconnect and Delete runtime.**

**Run All** simply just runs all the cells in the notebook in order. As this notebook operates linearly, your first run upon connecting to a runtime will always need to go through all the cells.

![Screen Shot 2022-06-22 at 6.36.45 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5721fe7f-606e-480a-8e8d-fc151bbce674/Screen_Shot_2022-06-22_at_6.36.45_PM.png)

After all the setup is done, any time a run completes (or is manually stopped through the Runtime -> “**Interrupt execution”** button *or* by clicking on the thing that looks like the picture on the right when doing a run), you will not have to rerun any of the other cells unless you make a change to one of the settings. I.E. you changed the prompt? Gotta run that cell again. Change the clip_guidance_scale? Gotta run that section again.

         

https://lh6.googleusercontent.com/yJ6BOtspbLDECY3Q24lmjfnQgqCGkR_UQra6Frt76cvA8L5RKrXQ2tjG13Pv9npIMMkPVgnTkN_NCOBeUI_YCy5_B5VIL2_YRwacR7vFX690H0ZRIktFhJBTxZEM-q3UhN_1cPYySdx7xm2nFQ

**Disconnect and delete runtime** is also important if you want to stay out of GPU jail. Any time you’re done with your runs, I advise hitting the **Save** button first and then clicking the **Disconnect and delete runtime ****button. This will disconnect you from their servers but anything you right click+saved to your desktop or was output onto your drive will be preserved. If you don’t manually disconnect, they will boot you off for being idle for too long anyway. They will also just boot you off if you’ve been on for too long and may restrict you from starting another runtime for 12-24 hours usually, so it is best to disconnect when you’re not working with it.

![Screen Shot 2022-06-22 at 6.44.11 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/49432134-7352-4fff-9397-22caafa1e39c/Screen_Shot_2022-06-22_at_6.44.11_PM.png)

**Help** is just your general help bar. I’ve never checked out Google’s Colab guides but there might be something helpful in there. Also if you’re looking for a certain Colab setting or tool, you can search for it there.

**Share** is useful if you want to link your notebook to someone else. It works the same exact way you share a Google Doc.

Lastly, the **Connect** button will just connect you to a GPU (a runtime). Pushing run all will also automatically connect you, too. The little dropdown next to the runtime information button will  let you see the resources you’re using.

**Now onto the notebook!**

![image18.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/864b8f05-d381-4183-ac34-d6dc1f401d35/image18.png)

Looking at the first section, **Tutorial**, there’s a nice grid which contains a little blurb about each parameter. The explanations are short and…. very outdated. Some of them don’t work exactly as described and the default values aren’t really all that relevant. I keep the Tutorial tab closed.

I’ll be going over the settings later on in the guide, but I also recommend you check out [**Zippy’s Cheat Sheet](https://docs.google.com/document/d/1l8s7uS2dGqjztYSjPpzlmXLjl5PM3IGkRWI3IiCuK7g/mobilebasic)** for a better explanation of the settings and than the **Tutorial** tab has to offer.

.

This next section is the first bit of code you’ll encounter — the **Setup** section, where a lot of important things are downloaded and established.

![image51.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f99da600-780c-4115-8a7b-5c436bfe0472/image51.png)

You can generally keep this whole section collapsed, but I highly recommend checking the **google_drive** box. This will allow you to save your outputs to your drive so you don’t have to right click+save each one. Additionally, if you have that connected and you have about 4-5gb of storage on your Drive, you should also check **save_models_to_google_drive.** There are some larger files that get downloaded prior to running a generation and it can take a while. Having them on your cloud allows them to get imported much more quickly than being downloaded from Github. Also, should the download link ever go bad for the models (this has happened before), you’ll have them safely stored on your Google Drive.

We’re just going to skip over the other sections as they’re not super important right now and get to the **Prompts** and **Diffuse!/Do the Run! Section.**

In the **Prompts** you’ll see that classic default “a beautiful painting of a singular..” prompt that any seasoned user of Disco will be quite familiar with. The only thing we’re going to touch for now is the text inside the quotation marks in **0:[“   ”].** The **100:** prompt thing doesn’t need to be touched, nor do the **image_prompts**.

At the **Do the Run!** Section you’ll see **display_rate** and **n_batches.**  Display_rate is just how frequently it will show a partial. In this case, every 20 steps it will show how far it's gotten in its production which is a perfectly fine number. You can lower it if you want to see adjustments more frequently but only so much happens in 20 steps generally so it's a pretty good number.

**N_batches,** on the other hand, is probably something you’re going to want to change. That’s the number of times it will run your prompt. 50 times by default is kinda enormous. Assuming it will take >20 mins on default settings per run (which is generally normal) that’s 1000 minutes of running. I can promise you’ll get booted off of Colab before then. I reccomend setting this to 1 for now.

To make your first AI art piece, all you have to do is type your prompt in there by replacing the default text, and then clicking **Runtime → Run all.** An image will be made!

![image14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/526ebe51-e257-4891-9614-9662d67fff89/image14.png)

*Make sure to comment out the line that says “100:[]” by putting a # next to it.*

# Chapter 1: Prompt Engineering

The quintessence of text-to-image AI. This is your place to work your magic. 

If you’re just starting, getting your feet wet with prompts is a great place to begin. Unlike DALL-E and some of the other models that can capture all sorts of text prompts, Disco Diffusion has a little bit more of a learning curve. There are things it likes and things it struggles with. While that may be one of the drawbacks of traditional CLIP guided diffusion programs, it more than makes up for in the beautiful artistry of its outputs and the flexibility you have to fine-tune your results. It has it’s own unique charm and the ability to create extremely detailed, creative outputs.

It is best to make your prompt as legible and readable as possible. When in doubt, think of it like you’re talking to a human as it is trained from image captions pairs written by humans! No one (honestly willing to bet even including the developers) knows the full extent of how it processes prompts down to a T, but here’s a general protocol that I and others have found to work quite well.

## A Prompt Template

<aside>
💡 General format: *Subject, by Artist (and artist), modifier 1, modifier 2…*

</aside>

Here’s a visualization for easier reference:

| Subject / Main Idea | , | By artist name
or
By artist name and artist name 2 and artist name 3
(you can put as many as you like) | , | Modifiers
(separated by commas) |
| --- | --- | --- | --- | --- |
| A beautiful photo of a lush landscape | , | By thomas kinkade and marc simonetti | , | 4k resolution, trending on artstation |

I also really like the way [G4L44D explained it in his guide:](https://www.notion.so/cd4badf06e08440c99d8a93d4cd39f51?pvs=21) 

![Screen Shot 2022-06-23 at 4.12.39 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/22eb7fb7-ecd2-4b56-ad26-0370c461eac8/Screen_Shot_2022-06-23_at_4.12.39_PM.png)

I can guarantee you the example prompt listed up there will give you something pretty kind of neat.

Here’s a list of some fun and common things to add to your prompt, to get you started.

| Artists | Modifiers  |
| --- | --- |
| Fantasy Landscapes
- Tyler Edlin
- Mark Simonetti

Fantasy Characters
- Justin Gerard
- Wayne Barlowe
- Victor Adame Minguez
- Jesper Ejsing
- Gerald Brom
- Greg Rutkowski

Classics
- DaVinci
- Pablo Picasso
- Van Gogh
- Winslow Homer
- M.C. Escher

Sci-Fi
- Jim Burns
- John Harris
- Dean Ellis
- H.R. Giger

Anime
- Studio Ghibli
- Makoto Shinkai | 4k resolution
8k resolution
Unsplash photo contest winner
Trending on artstation
Deviantart
#pixelart
3d art
Digital art
Blender
Octane Render
Unreal engine
Watercolor
Oil painting
Acrylic painting
Shot on film
35mm lens
Portrait photography
Portrait
Character design
Cgsociety
Mandelbulb 3D
Trending on Flickr.
Vaporwave

(You can really put anything though, don’t let this limit you) |

These links go much more in depth on some other things you can add, especially the artist study

**The famous 70+ (650+ arists now) Artist Study**

[**https://weirdwonderfulai.art/resources/disco-diffusion-70-plus-artist-studies/**](https://weirdwonderfulai.art/resources/disco-diffusion-70-plus-artist-studies/)

**Modifiers Study**

[**https://weirdwonderfulai.art/resources/disco-diffusion-modifiers/**](https://weirdwonderfulai.art/resources/disco-diffusion-modifiers/)

**Excel Sheet of modifiers**

[**https://docs.google.com/spreadsheets/d/1j7zaDi_PkndizQ2pL8B_yMcwfKUdE6tSMhL31bYtJNs/edit#gid=0**](https://docs.google.com/spreadsheets/d/1j7zaDi_PkndizQ2pL8B_yMcwfKUdE6tSMhL31bYtJNs/edit#gid=0)

**All things prompting** 

https://docs.google.com/spreadsheets/d/1_jgQ9SyvUaBNP1mHHEzZ6HhL_Es1KwBKQtnpnmWW82I/edit#gid=1637207356

Technically, anything can be a modifier. To the AI, there is no such thing as a “modifier”. They’re just words with aesthetic implications. But adding “modifiers” is an easy way to describe the look of something. Words like ominous, evil, pure, divine, eldritch, sad, and so on, are adjectives that pop some sort of image into our head, right? It has a similar effect on Disco.

I would actually try to think about the words you’re using and what connotations they have. We’re not thinking of dictionary definitions here, we’re thinking of what these words mean to us and what we associate with them. I’ve seen people attempt to get just one subject in a render by using the word “lonely” as in “a lonely lighthouse on a hill.” The word “lonely” may help give you just one light house in your render but imagine all the other things the word connotes. Since it's a word associated with living things and not objects, you might get an anthropomorphized sad light house, or at the very least, the output might have a sad bleak mood to it that you didn’t intend it to have.

*There is an art to AI whispering*.

The way I like to think of it is making an Instagram post, or something of the like. The subject portion is your caption while all the modifiers/artists are the hashtags added to it, with commas acting as a good way to separate ideas.

When crafting a prompt, **it helps to be specific and use subjects and modifiers that have a consistent style.** Using artists as part of your prompt is so effective because they tend to have a common pattern for composition, color, etc. Also noting the use of **Artstation** and **4k resolution** in the example up there. The AI won’t know how to make an image look aesthetically pleasing unless you give it references of what is considered aesthetically pleasing. Artstation is a collection of the work of a lot of great concept artists, and 4k resolution, while it won’t make your image render in 4k size, it will try to capture the look that 4k resolution images have. The more that is left ambiguous the more problems you will generally run into. Don’t let this discourage you from trying out all kinds of prompts, though. It’s just something to be aware of.

Funnily enough, it may be something to do with how the model is fine-tuned, but including an artist who does oil painting will tend to do much better than just including “oil painting” I suspect this is because it benefits from the artists consistent style whereas oil paintings can vary tremendously and has less of pattern to learn from.

and of course you can always put the artist name + “oil painting” together for even greater guidance.

[Here](https://imgur.com/a/SnSIQRu) and [here](https://weirdwonderfulai.art/resources/disco-diffusion-70-plus-artist-studies/) are lists of a ton of different modifiers and artist names you can use, but I'll throw some of my favorite ones at the end of the section, along with some of the more common ones. Due to Disco’s dataset and architecture, there are some artists that cannot be captured at all, especially obscure ones who may not have made their way into the dataset. It’s also worth noting that the dataset Disco uses was made in 2019, so referencing things that occurred after that year may not work so well.

**Another tip!** The way you frame the subject of an image in your prompt matters. Consider “a man in a school bus” vs. “a school bus with a man in it.” More than likely, the way you imagine those two sentences in your head is different, and the AI might experience that same difference. The two prompts could generate vastly different images.

Or, for example, take: “a fight between Ironman and Megaman” vs “Megaman and Ironman are fighting.”

In the first example, the subject and image of a fight are emphasized in a clearer way than in the second example. It’s like the difference between active and passive voice in grammar. Although, honestly, capturing two separate figures is super difficult anyway.

Here’s an example of how much it matters to be unambiguous in your prompt, otherwise you can get simultaneous depictions of the double meaning your prompt may have.

![image20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/884a907e-b9cd-4211-bce1-49e0878e1d89/image20.png)

I asked Disco for an underground subway station in space. I got that, but I also got Subway, the restaurant.

![image37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c0f3149-8bf5-4026-8db0-7b203a1867c3/image37.png)

In this case, I asked for Chick-Fil-A. We definitely get that, sort of, but it looks like a sci-fi baby chick spaceship. Not even mad though, happy accident. 

Another example of something like this happening is when someone tried to get Turkey the country, and ended up with turkeys (the animal) running all over a landscape that does look like it could be in Turkey. And I know I personally have a few renders somewhere in which I asked for a phoenix, but ended up in Phoenix, Arizona instead.

Law of CLIP guided diffusion: If it can be misinterpreted in any way, shape, or form, it will be misinterpreted. 

**Here’s also a link to a quick, easy to read guide to prompt engineering by Coar**

[https://coar.notion.site/coar/Coar-s-Disco-Diffusion-Guide-3d86d652c15d4ca986325e808bde06aa](https://www.notion.so/3d86d652c15d4ca986325e808bde06aa?pvs=21)

## Strengths, Weaknesses, and Limitations of Disco Diffusion

After you’ve spent some time with Disco you’ll discover there’s certain things it can do exceptionally well and certain things it struggles with.  That’s just the nature of CLIP guided diffusion. It’s a constant work in progress, both on the developer’s side by making good ways to tweak the system, and on the user’s side in finding the best way to make use of those tweaks. 

And I’d like to point out that even just a few months ago (as of June 2022) it was thought that getting a normal looking face with Disco was impossible or unreliable at best. Without a single change to the code, that belief has completely changed as we, the users, have found better ways to navigate this program. So, any limitation I note is tentative at best!

**Strengths**

- Landscapes - On almost any kind of settings you can get some fantastic landscapes. They tend to be easier to generate as they generally are pretty consistent in composition. You know, earthy material running the bottom of the image, and sky on top. There’s not much to get confused with there.
- Portraits, or single objects - Also does well here, some may need some more setting tweaks but something like that “singular lighthouse” is pretty easy to capture.
- Abstract stuff - This is the act of turning Clip-guided diffusions limitations into something beautiful. There’s some classic AI hallmarks or “flaws”, like repetitive subjects or distorted objects. But purposefully going for something unique and abstract will make all those mistakes look normal, and that’s why I find this AI image generation method, while almost archaic compared to the recent improvements to other methods, so beautiful. It’s the act of being confidently incorrect. Whereas other programs’ mistakes may look like an image has been compressed or corrupted or a brush stroke was missed, the mistakes Disco makes look almost as if it had intended them to be there, and are incorporated in their own novel way.

**Weaknesses**

- Anything with multiple subjects - “batman fights superman” will generally not go well, unfortunately.
- Specifying a certain number of things in an image.
- The human form/anatomy - I’ve seen people pull it off, but it takes hefty settings and many tries at best. Also, the more variable a certain part of the body can be, the more likely it is to mess it up. On that point of consistency, landscapes do well as you can take a picture of a mountain from all sorts of angles, elevations, and orientations and the visual data will look pretty similar. Now for let’s say, a hand, you can have right hands, left hands, front facing, back facing, stretched out, in a fist, etc. They manifest in all sorts of ways in the dataset, and it’s harder to find that pattern. So, when generating something with a hand, for example, instead of taking one kind of depiction and running with it, you’ll get this weird average of every depiction, and it will look pretty messed up, especially if the hand isn’t the focal point or main subject.

I invite you to challenge these weaknesses and find ways around it, these aren’t hard limitations and for all I know there might be a good way to go about these things.

## Clip Retrieval

You can also use this [**wonderful tool](https://rom1504.github.io/clip-retrieval/?back=https%3A%2F%2Fknn5.laion.ai&index=laion5B&useMclip=false&query=%23beeple)** to see what kind of images CLIP references for certain phrases. This helps to narrow down what associations the AI might have with what words. As you can see with the default search “Beeple”, not all keywords correctly match the images we would expect, and some might not have anything come up at all. Still, it’s a good way to see what’s in store before investing your time rendering a prompt. It is also using a workaround method to see the images of our dataset, so it may not be 100% accurate. You are more looking to see if it understands the general trend or idea of the words you put in.

My buddy **lowfuel** also made [**this wonderful guide](https://docs.google.com/presentation/d/19vDLV1fCOrJ0tpsXK4HMtjVOH73rjglrDSqHvhM3yio/edit#slide=id.g1360cfe14db_0_2069)** of artists and their respective CLIP scores, which is how confident CLIP is in its own ability to recognize their works. Although, if there are mismatches in the image/caption pairs, it will still give inaccurate results. At the very least, though, it will have an effect on the image.

Now, you can go ahead and create your first personal image. Scroll down to the bottom where you’ll see a cell with some words in it. It’ll look like this:

https://lh5.googleusercontent.com/WCBhti7G3gvwwtywRBKpZ6VlV65kFE69k2-ypB6nJ3MDZtj4qss7v7RQqNkkZjKxvxPY65fxS_RIIci3LbRAQYIT1gRa124BY33fHrqZe1lmeBEqsFbSDDz_TSJ1qEhQzC87uGuiTsXT28OGEQ

The only thing you need to worry about for now is the phrase within the quotes.

It needs to be in this format for it to work:

*0: [“words words words”]*

Notice the indents as well on the left side. That’s important.

Once you type in whatever you’d like in there, go ahead go to the top header of the window, click **Runtime -> Run All**

https://lh4.googleusercontent.com/94Vvt6iKrbI_4yX9cMyncw7qgscafFGw2oNqRSLBunDrx5Sg4rWmw6xG9JhmV0qGb7MRZ40Xgzehso5qNMHwkyyiLXlNXAQwT-gZDT9k1yzC4FmnKG_tB7gbh0J2UM9D1qdMWBwwlwd6Go9v5g

Cool! Now soon you will have your first image.

Just by practicing making prompts and making lots of images, you’ll start getting some cool stuff. I invite you to experiment and make things that excite you! You can get great images out of Disco just by mastering the art of prompt engineering.

# Chapter 2: Init Images

Another fun thing you’ve got in your AI Art toolbox is the ability to upload your own images to Disco and use the AI to evolve them, or “paint” over them. If you don’t want a render to start from zero, this is the section for you.

To start, go to your file directory after you’ve connected to a runtime.

https://lh3.googleusercontent.com/Uma7jSZQelQg2IWeWXZdVpRg5vQ3H4BzZwJAi-EBRereRUffscGeSvZIYA61Rv8vTTyRwWbuEXtZuOQjexpeNY9wGeQW01tf9R35A5gda_wUuhYwo6lgqaj5hTQxgta-IVaVhQiSLAtOqkSP2Q

Then, you’re going to click on this button circled in red which will prompt you to upload a file. Upload your picture.

https://lh6.googleusercontent.com/T__OB9yUj4CarTNHECLLVm67si6uOrD47gNb_HzqC6Nbow1QoKmT1WtpjhIZHky8QYxHTNN16bbZDQb6qr7TRfMUmogDHtzp4Kma5kA4KrvFIO9TP-vCRsWIXTIwIeB3rv_FCmu-7thXMJOa6A

Now you should see it in the file browser, click the 3 dots to the right of the file name, and click the option that says “copy path”.

https://lh5.googleusercontent.com/MTbFmzGyw2DM5d6vLqEEzpzMD0dIJXkkFcb4MSyTNZDCrEprfrCSR508Yf7UJqMjl4e1jmgdczqKbjA53eXAxDCLdK5QvJQH99cFDVOYJsF8TQW9Dg8gEsOSpwI_uCd1Uc-y50fWA_aGeF7-RA

Then you’re going to paste what you just copied into the text form underlined in red in the picture below. You may need to put a period “.” right before the first slash although that might just be if you’re running locally on a windows device.   ./init_images/Sampleimage.jpg    

https://lh4.googleusercontent.com/CiUk1_Bea42xqxkpN1oIVZYJ2VD1JkXndXw8GBprHJ1ihM3k7oiqiKL_Va7vzbd9xNGPeh5B0IDWhelGKkYXrXfCprjVXISRk02jpMNtBVAgqkmhTQq2RG38tAoJQXno5nF_XL5MTA7gA3PnRQ

At this point you’re almost done but you have a few more steps. 

You’re going to want to adjust your resolution to something proportional, or at least closely proportional, to the init image resolution you set. Otherwise, the image you put in will get stretched to fit.

So, for example, if you have an image you want to use that is 1000x800. The width: length proportion is 5:4 or 1.25:1. We would want to select a resolution that is also 5:4, or very close to it, to minimize stretching and resizing. 960x768 puts us at exactly 1.25:1, so that would be an ideal size to render at. 

<aside>
💡 Keep in mind that the width and length values both have to be multiples of 64 or else they will be automatically rounded down by Disco diffusion.

</aside>

## **Skip_Steps**

Just as the little tooltip suggests in the Colab Notebook, you’re going to want to set skip steps to about 50% of what your total steps are. So if your setting parameter is showing 250, you’d put 125 there.

That’s mainly just a good spot to get started, lower skip_steps will give the ai more influence over the output at the expense of losing more of your original image. Higher skip_steps will preserve your image better but also allow less influence from the AI.

**Experiments with Skip Steps -**

[**BellsTheorem**](https://www.reddit.com/r/DiscoDiffusion/comments/ump7p4/controlling_influence_of_initial_image_with_skip/)

[**Pinthead**](https://www.reddit.com/r/DiscoDiffusion/comments/u00hdi/init_image_guiding_the_prompt_with_various_skip/)

## **Init_scale**

This one’s a bit finicky. Higher init_scale will preserve the colors and details of your init image better in a way that is different from skip_steps. I believe the best way to go about it is to let skip_steps be the main way of tuning the level of ai influence, and then let init_scale finetune that influence itself. I don’t often use init images, but I’ve typically ranged from 0-1000 for Init Scale.

**See more advanced tips with init_image here.**

# Chapter 3: Settings

If you want to take your images to the next level, prompts are important. But prompts could only get you so far. Disco Diffusion has some critical settings, and learning how they work and what values work best for you could mean the difference between the two images I attached below. It’s the same exact prompt, four months apart (after I learned how to use the settings).

“a computer in the renaissance, fresco, trending on artstation”

**January 2022**

https://lh4.googleusercontent.com/Rsf6yEDzC9l6uk37g9yxRPA7POL9LLAs76EcvxwtvY_MUOj2Fb_O0i-ixXCDui6IipjRH-9YV3Lblo-jR69wi16Q0z_AtM4_rTXKjlYLcH07yQg3foyMKhd0g6t4GROrWQ1Tx_bBpaVtfrHaEQ

**May 2022**

https://lh6.googleusercontent.com/eoVarABddwHvTcwEMTyaQL2HWdO_C485OsdEgdm-90aUhVpEI9Fl_auz7EroI_2A1NbZK13roe4MjPtkcn8m3ZvVusBzsAfD8PxcSko29ELoRjW_FFqOxXUHDehy6t01Id06rOlf6lMYKMqq3g

There are some pretty dramatic improvements when you get some good settings down.

However, prompt is still king. 

I like to think of settings as a multiplier to your prompt, if you’ve got a crappy prompt but really well tuned settings, you still wont’t get very far. 0 x 100 = 0.

I won’t discuss these settings with too much detail in this chapter because it can get overwhelming. Instead, I’ll focus on simply getting you familiar with the settings and giving you some effective values to play with. I’ll discuss settings in full depth in **Chapter Five.**

<aside>
💡 if it’s too much to take in at once, search for “baseline settings” on this document and it’ll give you a good place to start, to which then you can better fine tune as you delve into this section.

</aside>

By the way, these settings (with the exception of the last one), should not affect memory usage, so you won’t have to worry about exceeding your GPU’s memory budget with these. And it’s worth noting that even with the last setting, the combination of settings I list later work just fine on Colab Pro and sometimes even on the free version of Colab.

With that said, let’s dive into the settings.

## Diffusion Models

*Found in **Diffusion and Clip Model Settings** tab*

The models you use to render an image are probably the biggest factor involved in getting higher quality outputs. However, this quality comes at the cost of increased memory usage and increased render times. If you try to run too many of these models at a high resolution, you will more than likely get an *Out of Memory* error. I cover that in more detail **later**.  For now, I’ll just recommend one big, awesome model that will boost your output, and two smaller models that you can play around with.

To get started, navigate to the cell that looks like the one in the picture below.

https://lh3.googleusercontent.com/3aAKBSnyY0xcPAMZC638xQv6MYXDejSWBThlNJzP-gqbvr2xwjdjAACw8yJOPOpaxcugBl86x7NHX6HCOCCWEzmImsTWiIUwdXA49v9CsKYu-VmITFbdd29NMthQsBHhzhMnqqKNCzpoHXFoXw

By default, you’ll have these 3 checked: VITB32, VITB16 and RN50. I’ll talk a bit more about what these all mean later.

For now, memory permitting, **try turning on VITL14.** Pound for pound, VITL14 is the strongest model out there and makes a huge difference to output quality.

Beyond that, I also recommend experimenting with:

1. Swapping out RN50 for RN101, RN101 is a bit bigger and a bit stronger, but stylistically each has their own look and it’s a matter of preference which you use.
2. Try throwing RN50x4 into the mix.
3. Doing whatever your heart desires! Just keep in mind that RN50x16, RN50x64, and VITL14_336 are all very large models and won’t be able to run unless you lower both your resolution and another setting called cuts by a lot.

**Default:** VITB32 + VITB16 + RN50

**Suggested:** VITB32 + VITB16 + VITL14 + (RN50 or RN101) + RN50x4 (optional)

**Experiments:** 

**(**Short ones, as they can get overwhelming quickly. I’ll link more further down)

- [**https://www.reddit.com/r/DiscoDiffusion/comments/tfwq6x/experimenting_with_different_models_a_portal_to/](https://www.reddit.com/r/DiscoDiffusion/comments/tfwq6x/experimenting_with_different_models_a_portal_to/) - me**
- [**https://www.reddit.com/r/DiscoDiffusion/comments/tpryxi/a_comprehensive_guide_to_different_perceptor/](https://www.reddit.com/r/DiscoDiffusion/comments/tpryxi/a_comprehensive_guide_to_different_perceptor/) - me**
- [**https://www.reddit.com/r/DiscoDiffusion/comments/tbaygt/modelssteps_test_using_the_famous_atlantis_prompt/](https://www.reddit.com/r/DiscoDiffusion/comments/tbaygt/modelssteps_test_using_the_famous_atlantis_prompt/) - u/1stclaas, also mixes in res changes + steps changes**
- [**https://www.reddit.com/r/DiscoDiffusion/comments/twivva/testing_clip_models_multiple_combinations_with/](https://www.reddit.com/r/DiscoDiffusion/comments/twivva/testing_clip_models_multiple_combinations_with/) - u/guioakhouse**
- [**https://www.reddit.com/r/DiscoDiffusion/comments/t7p4bi/seascape_test_1_using_different_model_settings/](https://www.reddit.com/r/DiscoDiffusion/comments/t7p4bi/seascape_test_1_using_different_model_settings/) - u/relaxedorange**

## Clip Guidance Scale (CGS)

*Found in **Basic Settings** tab*

This parameter guides how much Disco stays true to the prompt during the production of the image. Higher CGS = stronger influence. At 0, there’s no guidance and image production will effectively be random, creating absolute nonsense from what we call *AI Limbo*. That said, values that are too high can also distort the image by putting too much pressure on the generation to display the prompt. I’ll go more into that later. For now, I suggest putting your CGS at 10k-30k to start.

**Default Value:** 5000

**Suggested Values:** 10k-30k

**Maximum Possible Range:** (-∞,∞) though you’ll end up in AI limbo around 500k+

**Experiments**

- [**Me**](https://www.reddit.com/r/DiscoDiffusion/comments/tlrbmu/testing_clip_guidance_a_sentient_android_made_of/)
- [**Me**](https://drive.google.com/drive/folders/1241Ziiyu0KvinolOTE37YI45BZNSN748?usp=sharing)
- **u/[JasonMHough](https://www.reddit.com/r/DiscoDiffusion/comments/t9n3w4/experimenting_with_clip_guidance_scale_all_other/)**
- [**u/Taika-Kim**](https://www.reddit.com/r/DiscoDiffusion/comments/twomoo/clip_guidance_scale_experiment/)
- [**KyrickYoung**](https://twitter.com/KyrickYoung/status/1502840347164094468)
- [**KyrickYoung**](https://twitter.com/KyrickYoung/status/1502839197882793987)

**Here’s a little mini example I did**

https://lh6.googleusercontent.com/zqAzhgxu7oyv5H__IQPjBt4NcM7LEwlqssDwog6PZ-nDM8TP0mLckHZB6o6TGCdClXuewwmC_k1FnOyDeXeWqCcazd-3q6lo42RhMFa3RCJCzJSfgCUN3CUfIDvFyJJQNnjoevZKzWxdzvDq4A

And some more from some [**studies G4L44D did](https://www.notion.so/cd4badf06e08440c99d8a93d4cd39f51?pvs=21),** which really illustrates what can happen when CGS gets too high.

https://lh3.googleusercontent.com/RoqVLKCmXWPOeJ7B93X4DEvam-hIxuYay7twE6IwlInOmN6Ss0ceMewr1u26FFLBtWODZzE1GwocbhBrlGmC2HUmLSKjdfvB6oVXiiK7CPdafsRuuKDHx7xZf6zKV85V-UvJ_z-ThX_2O-SVYQ

![cgs3.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d30132c5-5dd8-479f-9af6-d00a796c32af/cgs3.png)

![cgs4.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e96a5d6e-6f8b-4730-b781-6c110affa51f/cgs4.png)

You can see how it falls apart beyond 300k. Part of that is because all of your “scale” variables are all summed together, and all get a piece of the pie in the creation. Raising one scale very high can dilute the others.

Also funny how at 1 million it looks pretty comparable to 0 CGS, both completely ignoring the prompt and giving us a look into AI limbo

## Resolution

*found in **Basic Settings** tab*

This one’s straightforward. Resolution dictates the size of the output. Higher resolutions dig more into your VRAM usage. Your specified resolution must be a multiple of 64. That’s just the diffusion model’s rules. If it’s any other number, it will be rounded down to the nearest multiple of 64. I.e., putting in 767 will drop it to 704. Also, important to note, resolution seems to also affect color, and composition, among other things.

u/relaxedorange made a really good experiment showing some of the quality loss you can have at smaller resolutions: [**https://www.reddit.com/r/DiscoDiffusion/comments/t9njmz/seascape_test_3_different_resolutions_using_the/**](https://www.reddit.com/r/DiscoDiffusion/comments/t9njmz/seascape_test_3_different_resolutions_using_the/)

However, you’ll notice there’s not a ton of improvement beyond the 1280x768 resolution, so for that reason, I believe there’s no need to run any higher resolution than that for the sake of time and memory usage. You are better off resizing your output using an AI Upscaler like [ESRGAN](https://colab.research.google.com/drive/1k2Zod6kSHEvraybHl50Lys0LerhyTMCo?usp=sharing), which phenomenally preserves detail.

Another thing to note, the aspect ratio you select (ratio of width to height) does seem to affect how your prompt is interpreted/how well it can come out. Vertical images have a bias towards portraits, horizontal images have a bias towards landscapes. You can still capture a subject even in the less favorable aspect ratio, but it may be more difficult.

*These settings are for running with **use_secondary_model** checked, as the rules change without it.*

**Default:** 1280x768

**Suggested:** preferably above 640x640. Beyond 1280x768, improvement isn’t noticeable and you’re better off using an Upscaler.

**Max range:** Technically there is none, but memory usage will increase exponentially as you keep pushing it.

## Cut_ic_pow

*found in **Extra Settings → Cutn Scheduling***

This one’s a bit of a rabbit hole to go down to understand, so for now we’ll say that higher values = more detail. It may also help with DD’s tendency to add blur to things, but potentially at the cost of messed up compositions. It could increase weird repetitions of your subject which we call *motifs*. I also suggest using a higher **tv_scale** if you are using large numbers (assuming you are running with secondary model off) to counteract any detail that gets too intense. It is also a great way to capture more detail when using lower-end models or less cuts. You can check out a section on the detail vs coherence balancing act **later in the guide**.

**Default Value:** 1

**Suggested Values:** 5-10

**Max Range:** 0-100, 100 is the max value where cuts reach their min size, 224x224 (for most CLIP models)

**Experiments**

- [**me](https://www.reddit.com/r/DiscoDiffusion/comments/tdqnh7/cut_ic_pow_one_more_time_because_i_think_this/)!**
- [**me**](https://www.reddit.com/r/DiscoDiffusion/comments/t9y15s/varying_cut_ic_pow_while_holding_other_settings/)
- [**https://drive.google.com/file/d/19ekqvNRDN1U-06CvlWH9P4L4M6u1Lln1/view?usp=sharing**](https://drive.google.com/file/d/19ekqvNRDN1U-06CvlWH9P4L4M6u1Lln1/view?usp=sharing)
- [**KyrickYoung**](https://twitter.com/KyrickYoung/status/1501771536876945409)

https://lh6.googleusercontent.com/Kme37nayccaZrs8rh6KvKFxlOYNE9YrBt-l6_ZEyrT0aKWXf3Ng8OWv3wUFdsC-5fGOuruEvyVi4GySaHG_wYg0or8r5F2UVLG1LutUp_f7-5qfjHdjzMALZgRNY19XvACyaNBMzTvw6w3CIYg

## Steps

*found in **Basic Settings***

This is the number of steps it takes to generate your output. At the start of the generation, you’ll just see a mass of noise/random pixels. On every step, some of that noise is removed to “reveal” the image within it. The default setting of 250 steps is not bad, but is more prone to the classic overexposed/too much contrast look that occurs with some prompts. 

However, increasing steps is directly proportional to the time it takes to render an image. 500 steps will take twice as long as 250. 250 is a good option, but I find 500 to be the goldilocks zone. The improvement at 1000 is marginal (imo) and takes a lot of time.

Some alternative values you can try are 200, 333, 500, and 1000.

You’ve probably noticed there’s a pattern to these numbers. The original program was trained on 1000 steps (we’ll call em Dsteps to avoid confusion), so any time you use a different number, you are dividing that 1000 among whatever number you are using. So at 500, you’d be executing 2 Dsteps per step. If it can’t divide evenly, the steps at the end are wasted, so it’s best to use one of those suggested values. 333 is close enough, 1000 - 333x3 = 1, you’d only be losing 1/1000 of the generation which is fully passable. However at 334, that number x 3 is greater than 1000, which would then bump it down to this equation 1000 - 334x2 = 332, losing 33.2% of the generation.

While it is possible to do over 1000 steps, they haven’t been observed to be beneficial.

**Default Value:** 250

**Suggested Values:** 200, 250, 333, 500, 1000

**Max range:** 1 - infinity

**Experiments:**

- [**credit u/JasonMHough**](https://www.reddit.com/r/DiscoDiffusion/comments/tb82fm/experimenting_with_steps_all_other_variables/)
- [**Me**](https://drive.google.com/file/d/1RDDzMxifngBg1OdT2IKR-Ys5K_kdaTzD/view?usp=sharing)
- [**RelaxedOrange**](https://www.reddit.com/r/DiscoDiffusion/comments/tb68id/seascape_test_4_low_steps_w_an_initial_image/)

https://lh3.googleusercontent.com/3Wx7cK8HiJmiBSmX-dzSI2lep0gb-MuPl4bPs0laEb8tAYZYAem4AzwupXxUzRIMh6Nznv52pwl92rc-rFxADLbQdAGG7BccYtYPdrDkDt0gsaG1vzIr3ga1j7zxmZrZeaLeD-2h_BTP21HYRg

https://lh4.googleusercontent.com/gGGPKL1GouJ8Ff4YM5TLYsUjfrTYEdYUHMis616BTNoNdpcJlck-Io7zd0_h9vSknW8rk5jiwbXQs5i3s9X7SvmS34Z328nqjTdevLgyNItE-wfzKJaS0tbmEI8i4DrXiHGKsz0GUo1RP4Tfqg

*Here’s a chart that indicates the best step choices to avoid losing part of the curve. All that’s really important is the dotted points with the # of steps on them.*

And some more examples brought to you by [**G4L44D**](https://www.notion.so/cd4badf06e08440c99d8a93d4cd39f51?pvs=21)

![Screen Shot 2022-06-28 at 9.06.19 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f72bb04a-7c6e-456b-9706-2e4513128946/Screen_Shot_2022-06-28_at_9.06.19_PM.png)

![Screen Shot 2022-06-28 at 9.06.24 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70face35-a53b-483c-829f-557a00ba260d/Screen_Shot_2022-06-28_at_9.06.24_PM.png)

![Screen Shot 2022-06-28 at 9.06.29 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05707e50-32b1-49d4-b9c0-d56cbc466b39/Screen_Shot_2022-06-28_at_9.06.29_PM.png)

![Screen Shot 2022-06-28 at 9.06.33 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8dd55485-4971-4e87-a782-824cf99de7cd/Screen_Shot_2022-06-28_at_9.06.33_PM.png)

These are with secondary model turned off, not too much improvement beyond 250/333 steps with the main notable difference being a drop in color and lighting which may be mediated by the relationship of clamp_max to steps. And perhaps a greater perceived depth which is something I’ve noticed with my outputs as well.

## Cutn Batches

*found in **Basic Settings***

This setting is similar to steps in that doubling the value will also double your time. You may see some cleaner textures and composition at 5-8, but I personally would rather increase steps than the cutn batches. There’s more “bang for buck” that way, but don’t let that discourage you from experimenting. Any more than 8 is pretty negligible in impact. You can try 2 as well, it’ll be almost twice as fast, but you may notice some quality loss. **This is generally not a setting that will make or break a generation**.

**Default Value:** 4

**Suggested Values:** 2-8

**Max range:** 1-infinity

**Experiments**

- [**credit u/jmar777**](https://www.reddit.com/r/DiscoDiffusion/comments/tgdl1b/testing_cutn_batches_1_2_4_8_16_32/)
- [**credit u/JasonMHough**](https://www.reddit.com/r/DiscoDiffusion/comments/t9pg99/experimenting_with_cutn_batches_all_other/)
- [**sureailabs**](https://twitter.com/sureailabs/status/1499561275562602496)

## Clamp_Max

Clamp_max functions sort of as a master knob for a lot that goes on in the image generation. Increasing this value helps with saturation, increased contrast, and detail. But it also makes the image much more prone to overexposure/oversaturation (some prompts are more at risk than others). Additionally, higher clamp values need more steps to be successful. You’ll also notice that the denoising occurs much more quickly, with the image looking quite complete despite a little blur around 40-50%.

**Default:** 0.05

**Suggested:** 0.05-0.10, can also try lower than 0.05 if a certain prompt is consistently overexposed.

**Experiments**

- [**unknown - might be KyrickYoung**](https://drive.google.com/file/d/1blPIzJKpsGNeVsVN-5wfDps_Boc85drB/view?usp=sharing)
- [**KyrickYoung**](https://twitter.com/KyrickYoung/status/1500263875442356224)
- [**Me - only 0.05 - 0.075 but wide prompt variety.**](https://drive.google.com/drive/folders/1SZfgPGbz-M7uuiD7z6ZtgUJwKd1HR4La?usp=sharing)

## Symmetry Switch

This feature is a helpful way to get symmetrical outputs, which is especially useful for portraits, but it can really help with just about anything. The way it works is that whatever decimal you set it to is the % during the run at which it will take the current image that it has and mirror it, and then continue on just like that. So, at 0.4, for example, whatever the image looks like at 40%, it will be mirrored, and just continue from that point. There are no distinct default or suggested values yet as this is pretty new.

I would estimate 0.3-0.4 should do well to help with giving a general sense of symmetry without making it look like a full-on mirror reflection.

I personally find this method of going about symmetry really aggressive, and I generally prefer another setting which I have modded my notebook to have called **Symmetry Loss** (thanks to HighDruidMotas).

Similar to other “scale” values, it guides the generation towards symmetry. It sort of influences or directs it towards symmetry rather than outright mirroring.

**Default values:**

Symmetry loss scale: ~160,000 (strength of symmetry)

Symmetry switch: 69 (# of steps to run with symmetry loss, afterwards it turns off and no longer influences generation

## Other Settings

### Range Scale, TV_Scale, Sat_Scale

*found in **Basic Settings** tab*

Honestly, none of these seem to work when **[✅] use_secondary model** is checked, which is something we’ll talk about later. I and others have messed around a lot with these and haven’t found any conclusion we can draw. In theory though:

**Range:** limits extreme colors, particularly absolute black and absolute whites, which is also known as clipping (when a section of a image has become either so bright or dark that all the pixels in that area are at the max whiteness/blackness and thus any detail there is lost). Higher numbers should limit this from happening, but **even trying values up in the billions, it doesn’t seem to really do anything with or without secondary model. Sat_scale** seems to be able to limit some of what range scale was meant to limit however.

Higher numbers result in more limiting of this from happening: [**Experiment 1 with secondary model](https://drive.google.com/drive/folders/1UsdGWSTGJvqSujk2Q_oncRkxpWIXaVEb?usp=sharing) - [Aetherial](https://twitter.com/AetherialDnB)**

In other words, or pictures I suppose, the general purpose is to prevent images from looking like this:

https://lh6.googleusercontent.com/CBnbXC5FRgGHpYZI8G-FksH8HQ7p7Z8SqyU7R02exlLX7pjrXzIMZFUkqmbjkOtWR9jLaskN4ELb-lx55wa2HD-jjhoai_GM7j8DbVkaj2UVKOzLc3HwY7Esa5q5yzNeTA6s_xfbUYDMYZVQlQ

**TV_Scale:** controls smoothness of final output. Higher = more smooth which is nice for when detail is overwhelming or crunchy but again, doesn’t seem to work unless secondary model is removed

[**Experiment1 with secondary model](https://www.reddit.com/r/DiscoDiffusion/comments/t9xwcs/experimenting_with_tv_scale_all_other_variables/)** - u/lowfuel

**Sat_scale**: controls for color saturation, higher = more limit to color saturation

For all of these, the range is -∞ to ∞. But they seem to work (when secondary model is off) around similar values to **clip_guidance_scale**. The values can be negative, but I STRONGLY suggest not doing that, it will just drive things out of control.

So, 5k-50k is where I’ve noticed significant differences.

These scales seem to be soft limiters rather than being really forceful on the image. For example, scaling up from 0 to 500k on Tv_scale, there seems to be a point at which smoothing flatlines. This may be at a different point for each prompt/combination of settings that can determine detail/crispness. The point is, it seems that increasing this value does not linearly increase smoothness, but just gives more of a push to what it considers optimal level of smoothness or saturation. Also, while some of these may sort of flatline for a while, many have noticed that cranking these to a million+ or sometimes even a billion+ will get you very strange results.

The same thing with sat_scale. Here’s some studies by **G4L44D** that sort of illustrate this. And a link to his [**full guide.**](https://www.notion.so/cd4badf06e08440c99d8a93d4cd39f51?pvs=21)

## **Sat Scale**

![sat_scale copy.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c5d9e77-3141-451f-891d-eafb19dbffd5/sat_scale_copy.jpg)

![sat_scale copy 2.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/189e53f0-940d-41f2-bb68-b59e3f3a0897/sat_scale_copy_2.jpg)

## **TV_Scale**

![TV1 copy.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e8f05ecb-27b8-4058-9c56-1240beee8e68/TV1_copy.png)

![TV1 copy 2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c8a21aa-0ff7-41a2-9eb9-51449e87fe72/TV1_copy_2.png)

## **Range Scale**

![Screen Shot 2022-06-28 at 8.33.39 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70436ca3-d132-4213-89d5-aafc346b9252/Screen_Shot_2022-06-28_at_8.33.39_PM.png)

![Screen Shot 2022-06-28 at 8.33.50 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/daccc44c-d2e4-4841-ac8d-53a8a4800232/Screen_Shot_2022-06-28_at_8.33.50_PM.png)

![Screen Shot 2022-06-28 at 8.33.58 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7866b873-4663-4afb-85a5-17deb5b54767/Screen_Shot_2022-06-28_at_8.33.58_PM.png)

![Screen Shot 2022-06-28 at 8.34.04 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6f8b84cb-1f61-47e1-9292-392974f97c8c/Screen_Shot_2022-06-28_at_8.34.04_PM.png)

Really can’t see anything notable going on in this one. Also to note: this range scale was not done with constant seed.

**All of the loss scale values are dependent on resolution as far as I know. I do not know the exact ratio for its relationship, but something to keep in mind if it feels like some scales may be overdoing it when reducing your resolution.**

**Also, all of the losses are summed together when generating the image. Because of that, the scales’ relative values to each other may play a role. Although I don’t have a ton to offer on that, but it may be worth using similar values across all your “scale” variables (except init_scale of course)**

### Skip_steps

This is the number of steps you skip ahead when starting a run. So, if you have 250 steps and skip 10, you would start from 10 and go to 250, with 240 steps to be run. When you skip steps, that initial colorful noise you start with will be somewhat less noisy, less crazy pixelated, but not processed in any meaningful way to move towards your target.

The idea here is that early steps are somewhat unstable when finding your subject, but by having a little bit of skip steps you may be able to get something a bit cleaner. However this can come at the expense of some detail, color, and overall quality of an image. You’ll also notice it can help put a dampener on cases where things become heavily exposed

**Default:** 0

**Suggested: ~**4% of total, 10 skip on 250 steps

**Range:** just can’t be negative and cannot be greater than total steps.

**Experiments:** [**KyrickYoun](https://twitter.com/KyrickYoung/status/1502496082223419392)g**

Great experiment by KyrickYoung, showing how some of the loss in color, intensity etc. can be leveraged with increasing Clamp_max. It still does exhibit some quality loss, and thats because we’re sacrificing some of our noise reservoir. 

![FNnvhgvX0AYPfJA.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5d191e9f-bc94-4798-b6e3-82e8a9b0d1ae/FNnvhgvX0AYPfJA.jpeg)

However, I think some of the issues with grayness can also be resolved by making use of Perlin_init as there will still be a solid base for the AI to work with beyond the noise it ended up sacrificing. I have had great luck with it while running secondary model off.

Here’s an example with just that, by JohnBrainArtLabs

![perlintests4.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/34ef3b9a-638c-4f9c-b0ad-c740ada7caa0/perlintests4.png)

Here, personally my favorite is at the 30 skip steps, although 100 and 200 really arent even in the competition. Clamp_max was at default here.

### Eta

What this does is pretty hard to describe. Here’s my attempt: higher eta feels a bit more dynamic and detailed, lower is a bit flatter. While a totally different setting, a higher eta somewhat resembles raising clamp a bit. That’s the best way I can describe it, but pictures do it better justice. Eta is a proportion of two different types of noise sampling: DDIM and DDPM. With that said, ETA will have no effect on your output if you are using a different kind of noise sampling like PLMS At 1.0 it’s pure DDPM and at 0.0 it’s pure DDIM. DDPM(higher values) uses more random noise, and thus requires more steps for a complete looking output, although 250 is usually plenty.

**Default**: 0.8

**Suggested:** 0.8 is fine. 0.7-1.0 is a fun range to mess with. But some may prefer lower too.

**Range:** -1.0 to 1.0 (this can actually be negative, but what that is, I don’t exactly understand)

**Experiments**

- [**kyrickyoung**](https://twitter.com/KyrickYoung/status/1500302322282418187)
- [**KyrickYoung**](https://twitter.com/KyrickYoung/status/1500579112716578828)

### **Other settings that are worth knowing about, but generally not worth touching**

**Clamp_grad**: on by default, the results you see from adjusting clamp_max are mediated through this function. I do not suggest turning it off as your images will get *deep-fried.*

**Skip_Augs:** off by default, performs some augmentations/modifications that enhance the run. You can try turning it on for fun, I’m not super familiar with it, but haven’t seen much benefit to turning it off

**Fuzzy Prompt + Rand_Mag:** Fuzzy prompt, off by default. Makes the generation a bit less specific to your prompt, sort of some wiggle room as to how it's expressed. Turning on fuzzy prompt is just what turns the function on, Rand_mag is how intensely it plays a role.

Here’s [**u/Lowfuel’s great experiment](https://www.reddit.com/r/DiscoDiffusion/comments/taqdrs/experiment_with_rand_mag_most_other_settings/)** on it

https://lh3.googleusercontent.com/fHQ_0UvNvLojfJdVrBHa6-BoBOnTp14ZYKBKEi1dzQB_bK-rcStyalg4tjmTR8nD-f87QtKOebfZ3zA_vl0i5Mqv5J7Es_fo7NBAfOuxZNrqYE7Cm_xkeQX4Am9Mmlyr3yBJorqdb3RPklIyHQ

The way I see it (and another point I’m asking to be corrected if I am wrong) is that a prompt encodes data for an image of certain traits. It’s usually pretty specific, even on different seeds. Now imagine that the line between the origin and the point is the path the image generation takes. With **rand_mag** on, we’ve now got some wiggle room for it to veer off to the sides.

Wildly oversimplified, but enough to sort of get what it does.

That’s just about it for the basics of settings. In **Chapter Five**, I’ll do a far deeper dive on these settings, and discuss them at length.

# Chapter 4: Tech Support

After a while of playing with Disco and experimenting with its settings, you’ll inevitably get an out of memory (OOM) error. There’s about 3 different types I’ve seen come up:

1. Just flat out says CUDA out of memory error
2. Something about “could not find a valid cuDNN to run convolution”
3. :0: cudaGetLastError(): out of memory

## GPU memory budgeting and the infamous CUDA out of memory error

If you’re getting a CUDA out of memory error, it’s likely because Disco is trying to do a heavier job than what the GPU you got assigned could handle.

If you experience this error, chances are that you’ll likely have to end up just lowering your settings a bit, or loading one less model. You’ll just have to test what configurations Disco will be able to handle as you tinker with things.

The types of GPUs you can get (from weakest to strongest).

1. K80 - extremely slow, I recall it takes about an hour and a half on base settings 
2. T4 - <16gb (apparently about 15.2, but unsure) (might be a bit faster than p100 though)
3. P100 - 16gb
4. V100 - 16gb (like p100 but faster)
5. A100 - 40gb (this is a unicorn, you will rarely see this, and likely only with pro+)

So because of this, you’ll mostly be working with 16gb VRAM and having to budget within that limit.

A few other CUDA based errors I’ve seen

1. Something about “misaligned address”
    1. this is usually the product of trying to run VITL14 on a T4 GPU
        1. see this [**https://www.reddit.com/r/DiscoDiffusion/comments/ud7n52/runtimeerror_cuda_error_misaligned_address_can/i79rks3/**](https://www.reddit.com/r/DiscoDiffusion/comments/ud7n52/runtimeerror_cuda_error_misaligned_address_can/i79rks3/)
2. Illegal access of memory

These are a bit beyond my understanding, it may be something within the code or a faulty parameter you typed in, so double check that. But it could also be something hardware wise and may require you at the least to restart the runtime, if not, disconnect and get a new runtime.

## Dealing with Colab, Pro, Pro+, runtime timeouts

First, a clarification, as I’ve seen this get mixed up fairly often. The programs run through Colab notebooks — they are not powered by your own computer. You are outsourcing the program to run on Google's servers as your average device does not have the computational power to run the program.

Anyway, Google Colab has 3 tiers, all which allow you different amounts of resources and amount of time where you have access to GPUs. When you’re connected for too long you get put in what we call **GPU Jail,** which is when you’re locked out from starting a runtime, but usually goes away in 12-24 hours

1. Free Tier
    1. Slow, generally ¼ - ⅕ the speed of Pro, i’ve seen it take over an hour to generate on default settings. (this is as of January 2022, not sure if things have changed since, this may need to be updated from what others are telling me)
    2. Frequent GPU Jail
    3. Useful if you’re just getting started with disco and deciding whether this is something you would want to invest some cash in, or just a casual user.
2. Pro - 10$/month
    1. Typical speed, a render at default settings takes ~20 mins. Depends on GPU, but this seems to be pretty standard
    2. More GPU allowance, access to p100, v100, and on rare rare occasion the a100.
    3. Can run about 12 out of the 24 hours in a day.
3. Pro+ - 50$/month
    1. 24/7 running, really the main perk
    2. Same speed as Pro
    3. Get priority for higher end GPUs (although this one i’m really not sure how big the difference is)

Here are some guides by Dicknascarsixtynine that give a general idea of how much memory is used.

![secondary.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4c28c68e-7674-47fc-801c-84d5f1fd77ab/secondary.png)

Memory Usage 

with use_secondary_model [✓] (blue) 

vs without use_secondary_model (orange)

In general, running without secondary model uses ~2x the memory. However, at 100,000 total pixels (~320x320) they run about the same.

These numbers do not take into account unique combination of preceptor models, cuts, etc. but the relative values + the slope is a useful visual to gauge how much memory you will be using.

![plot.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eaf5bcb7-cc3d-4877-92b4-a8733e796189/plot.png)

And this is a measurement of peak memory usage as a function between a certain CLIP model and the number of cuts done (with secondary model enabled) VITL14 is missing, but I believe it should be pretty similar around where RN50x16 is.

## Running Locally

Running locally is a super great option, but there’s very few GPUs it can even be done on, and only 1 commercial GPU that has greater memory allowance than Colab’s GPUs. Despite the reduced memory, many tend to run faster than Colab when at the same performance settings, and of course you don’t have to worry about GPU jail, which is quite nice.

There are several ways you can do this:

1. **ProgRockDiffusion**: a version of DD that is run from the command line, also has some neat mods, but at the expense of the Colab interface.
    1. [**https://github.com/lowfuel/progrockdiffusion**](https://github.com/lowfuel/progrockdiffusion)
2. **JupyterNotebooks: or hooking up Colab to your own GPU rather than an outside one.**
    1. [**https://gist.github.com/MSFTserver/a05f637f32302918dd893318a4d9f62b**](https://gist.github.com/MSFTserver/a05f637f32302918dd893318a4d9f62b)
        1. This is the guide I used, fairly easy setup.
3. **Visions of Chaos:**
    1. This is probably the easiest way to get DD running locally and a lot of people love it, it has a nice, neat interface and has an installer to take care of much of the setup. The drawback is that I don’t think it allows as much customization or editing to the code.
4. There’s other tutorials and ways to do it out there that I am probably not even aware of.

## Running on a Third Party Cloud Service

Vast.ai is a super awesome service that lets you rent out GPUs heftier than what Colab offers you without interruption at some seriously nice prices. I think of it like the Uber of GPU sharing. It’s a marketplace where anyone can rent a GPU or offer up their GPU to be rented. Here are some useful links I’ve found to getting yourself started with Vast.AI. They also have a really nice FAQ that specifically caters to DiscoDiffusion questions so definitely check that out!

1. [brief explanation](https://discord.com/channels/944025072648216586/944025807905492992/976063136216006666)
2. [youtube tutorial](https://www.youtube.com/watch?v=XWta-cTxkSQ)
3. [reddit post](https://www.reddit.com/r/DiscoDiffusion/comments/uz6g2v/comment/iati6b7/?utm_source=share&utm_medium=web2x&context=3)

You will also need a special version of the DD notebook (super small change) to be compatible with their service. Some of the links up there should include a copy of a [**Vast.AI](http://Vast.AI)** compatible notebook.

Here’s a version of my custom notebook that is modded to work with Vast.ai

https://drive.google.com/file/d/1d11GKmL7__053ZYuEXDR0VdJX9oedIx9/view?usp=sharing

a bit outdated though

**IMPORTANT**:

Unlike Colab, VastAI does not connect to your Google Drive. All images and files created there remain there unless you decide to download them. If you end your session without downloading, they will be lost, forever. Their FAQ has a useful section explaining how to zip and download everything at once.

## A Good Way to Save Time: Drafting

Drafting is when you do a quick, low settings, run just to get a feel for what a prompt would look like. It’s useful to see if it’s worth spending the time on a longer, high quality run for a particular prompt.

It won’t look exactly how it would on your normal settings, but its a good way just to gauge a style or what a prompt may generally look like. 

There’s a couple of good ways to go about this. These are designed for running without secondary model. If drafting with secondary model, I would be more hesitant about reducing steps because of its tendency for overexposure. 

- **Cut batches = 1 or 2, the simplest way to go about this. Should be about 2-3x faster than 4 cutn batches and still will give the same general look.**
- **Lowering Steps**
- **Reducing Models - not recommended as much. This can strongly change the composition and style of a render.**

Another great method of saving time and processing power is to have a batch halt each render at the 40-50% mark. The idea is that by about 40%, it’s pretty close to what the image is going to look like. So why waste your time on filling out the last half if you can already see that it’s a misfire?

Basically, you can end up with a whole batch of partials in about 40% of the time. From there, toss whatever ones you don’t like and then you can feed the ones you do like back in as Init_images.

It is also suggested that you use the same seed and a number of skip steps corresponding to the % that it was stopped at

You can stop runs early using **Skip_end_steps**, a variable I added to my notebook (credits to Zippy), that specifies the # of steps that it will skip at the end/leave undone.

**PLMS method: I** talk about this more in the section on noise sampling, but an interesting way to draft can be to use PLMS sampling. PLMS sampling is said to work more quickly, in the sense that it does not need as many steps to give a complete looking output. In fact, too many steps and/or cut batches seems to “overdo” it sometimes, resulting in intense grain and rough images. 

So use this method, we may do something like this 

- Cutn batches = 1-2
- Steps = 75-150
- (Optional) can skip some steps at the end, maybe 20% may help avoid some of the grain. And still give a fairly complete image depending on what you’re using it for, I.e just trying to gauge a style or using it for overpainting or an init image.
- You may need to reduce your clamp_max to compensate for the reduced batches and steps

### **Upscaling**

So for many, Disco’s outputs don’t come out as high resolution as we may like them to be. Because of constraints both on resolution from VRAM budget as well as there being certain resolutions that seem to perform better than others, reaching that awesome crisp 4k resolution you might want may seem difficult. Fortunately we got a couple of pretty solid solutions. There’s at least 3 solid choices I can think of.

1. **AI Upscaler**

There are both programs and notebooks that offer this feature, and I believe even photoshop is looking to add this. They do far better than regular image resizing in photo editors and can help clean up excess noise or sharpen the edges. Also super neat about these, it makes putting images into photoshop afterwards much much easier. The defined edges help with selection tools and other stuff. Many also have facial enhancement features, which detect faces, even one’s that are decently deformed, and will attempt to fix them. (the facial enhancement modules are generally trained exclusively on human faces, so having a hyperrealistic human face superimposed on your Artstation style character may look uncanny) Here’s an example of that.

![Disco(39)_0_out-gigapixel-art-scale-0_75x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0847739-41d7-4735-9a1d-dabcff666433/Disco(39)_0_out-gigapixel-art-scale-0_75x.png)

![Disco(51)_0_out-gigapixel-art-scale-0_75x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc388904-413d-4669-be40-9cff116bc08b/Disco(51)_0_out-gigapixel-art-scale-0_75x.png)

I really really do not like these.

Anyway here’s some common choices for upscalers

1. [**Topaz Gigapixel](https://www.topazlabs.com/gigapixel-ai) - 100 dollars, runs on device**
    
    Often regarded as the best, it offers a few models to choose from which specialize in levels of compression and styles, supposedly at least, I haven’t seen many examples on it. It tends to be more conservative than others, offering a reliable result, whereas other upscalers will have greater influence over the image which can be good just as much as it can be bad. While Topaz’s effect is weaker, it can be counted on to at least do okay. I am able to run Topaz Gigapixel on my laptop’s intel graphics processor, which really says a ton. The Original size is what determines memory requirements and how long it will take to run, not as much as the desired output resolution. Resizing from 768x960 at 2.25x the size, it takes my laptop ~20secs per image.
    
2. [**ESRGAN - Colab,](https://colab.research.google.com/drive/1k2Zod6kSHEvraybHl50Lys0LerhyTMCo?usp=sharing) but also has a local option I am unfamiliar with**
    
    As you’ll be running on Colab opposed to whatever you may have set up locally, it's likely that it will be much faster. It allows you do batches as well, with my 768x960’s resizing 3.5x at about 1 output per 2 seconds. It also has a pretty strong facial enhance feature, the pictures above are from ESRGAN, but you do have the ability to turn it off.
    

Plus fun little project idea, if the face is too realistic, get that image, put it back into disco as an init at maybe 60-70% skip steps and run it again to blend it better.

1. **SwinIR**
    
    ****Personally have not tried this, but from what I’ve seen its pretty close to ESRGAN and most of the other upscalers out there.
    

u/wiskkey did several [**studies**](https://www.reddit.com/r/MediaSynthesis/comments/rmdpy0/6_upscalers_tested_with_2_input_images_the_newest/) on these comparing their performance and in general it’s almost imperceptible. And there’s much more on their profile beyond the linked one.

1. **GoBig mode**
    1. Super great idea by Lowfuel that he implemented in ProgRockDiffusion but also has since made a Colab notebook for it. Basically, it allows you to take one of your images, cut it into portions which are then run BACK through Disco as init_images at higher resolutions, to not only enlarge them but add new details. It then automatically takes all the upscaled portions of the images and neatly puts them back together.
    

# Chapter 5: Settings – A Deep Dive

## Understanding Clip_guidance_scale (CGS)

CGS is described as how much the image should look like your prompt, so more is better right? Why not crank that all the way up? As cool as it sounds, it’s a little more complex than that. Let’s say we’ve got a nice picture of a sunset, but now we want to make it look like ***even more*** of a sunset to satisfy a higher clip guidance scale. So what can the image generation do to make a sunset look more like a sunset? Start adding more of them everywhere. And unless you want something abstract, you probably don’t want that, so there is a healthy medium for that variable, I don’t know a perfect number but the 5k-20k zone seems to be pretty good, it also is very dependent on resolution from what others have said as well as other settings so I suggest some trial and error.

Every parameter you see with the word “scale” in it is a governor to the image generation, directing in a certain path to meet a goal, at every step a score is assigned which represents how much the image satisfies those scales. Well technically, it’s not exactly a score, with a high score we’re trying to reach, but rather a loss number, and we’re trying to minimize that number, but however you think of it, we end up at the same point.

Also, will have to double check this (again feel free to correct me on this), but I believe a higher CGS speeds up the denoising process, where the image will have greater clarity at an earlier step, **this is not exactly a good thing though.** When moving too quickly, the instability of the generation increases a bit and in its effort to maximize your prompt, it will try to see more of it in the picture. It’s a bit of an oversimplification how it works but that’s kind of how I think of it conceptually

Everyone loves the high CGS’s iconic strong contrast and well-defined edges and detail it brings, but the trade off for some of the errors is tough. Beyond the repetition of subject issue, it also has a strange tendency to give something the detail it would have as if it was in the foreground, when it is a background element. Here’s what I mean by that

![unnamed (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01a26c83-5bfc-4e29-834f-c3c89708cd7d/unnamed_(1).png)

Generally this kind of thing, a high cut_ic_pow can cause this as well, and even more likely if both of these are cranked up together.

If you’re willing to do some extra steps, I personally find that raising your clamp_max instead can get you that crisp look without blowing things out of control.

## Cutn Batches vs Steps

This is something i’ve been looking into recently, doubling your steps increases time roughly the same amount as doubling cutn_batches would. Doubling either one would result in the total number of cuts being executed throughout the entire run being doubled.

So, 250 steps, 16 cuts, 4 cut batches. You’re looking at 64 cuts per step x 250 steps = 16,000 cuts, wowie. (and then each CLIP model does its own, 16k x the 3 default models (vit32,16 + rn50) = 48k cuts)

If we double the steps, we’ll do same number per step but for twice as many steps

And doubling cutn batches, we’ll do twice as many per step for the same # of steps

Anyway though, the point is doubling one will have entirely different effects than doubling the other. Don’t have any notable experiments at the moment, but I hope to follow up with an experiment.

Anecdotally, **higher steps seem to give a greater sense of depth**, as I and a few others noticed. It also tends to help with greater detail but only really up to a point. For the secondary model, it probably tops off at 500, 1000 isn’t that much more impressive.

For the primary model, 200-250. The higher values aren’t too much more detailed, there do seem to be differences between those that I’m looking into now, but there sort of is a ceiling to detail you can achieve by increasing steps alone. However, at something like 166, 142, 100 steps, you’ll definitely notice a loss of detail, which sometimes isn’t all bad, some styles/subjects ask for smoothed out looks.

Meanwhile, adjusting cutn batches can give you some similar yet different results. Notably, higher cutn batches can stave off the tendency for overexposure. It also tends to be more detailed and have smoother textures, in the sense that the fine details are more convincing. They look less choppy or splayed than it might at lower cut batches.

However, I sort of find that cutn batches sometimes doesn’t know when to stop adding detail sometimes, in a way that can’t seem to be resolved with adjustments to cut pow or your cut schedule in a way that doesn’t sacrifice other things.

It is especially noticeable with faces, where 4 cutn batches (at least for what I run) is more likely to have double noses, uncalled for blemishes, weird stuff like that where it insists on just having more objects/things there.

So I’ve been experimenting with 2 cut batches while increasing steps to compensate for how lower cut batches can sort of dull out an image.

*Update 7/21/22: a study i did comparing steps against cut batches. black spaces were runs that failed*

![step vs cut batch.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf3792be-8e63-42db-abd1-bf7c3e9f8ecc/step_vs_cut_batch.jpg)

## Clamp_max

Clamp_Max is a super interesting variable as it’s native to pytorch which is sort of the toolbox that disco makes use of. While all our scales and cuts variables are things that are specific to our kind ai program generation, clamp_max runs a bit more deep than that. As it’s name implies it sets the max or ceiling that the clamp_grad is allowed to run to (i don’t fully understand what that means) But I like to think of it as a “master knob” or as “master volume setting” as it seems to govern a lot of other things.

A 0 clamp max will pretty much hinder anything from happening, your image might look ever so slightly different from the original noise.

At higher levels (0.15+), much more is brought of the image, in detail, depth, color, really just about everything. By raising that ceiling value we can get a more lively image. But also really easy for things to get overexposed as you can see here. To prevent that oversaturation, adjusting sat_scale will help, but generally may not be enough, it is also advised to use an adequate number of steps and batches. 

Secondary model is much more sensitive to raising clamp_max. I don’t even know if you’ll be able to get anything beyond just straight solid bleached colors at some of the values you can pull off on the primary model. Here’s a comparison of steps x clamp_max (author unknown)

![Screen Shot 2022-06-24 at 4.20.24 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a81e8dc4-a0f9-492b-84c1-ced07e01ae94/Screen_Shot_2022-06-24_at_4.20.24_PM.jpg)

[**Full Image**](https://drive.google.com/file/d/1blPIzJKpsGNeVsVN-5wfDps_Boc85drB/view?usp=sharing)

**Y-axis, top to bottom: 0.01, 0.025, 0.05, 0.075, 0.1, 0.2, 0.5 clamp_max**

**X-axis: 25, 50, 100, 250, 500 steps**

And here’s a few comparisons I did with the same prompts from my model study.

[**Full study**](https://drive.google.com/drive/folders/1SZfgPGbz-M7uuiD7z6ZtgUJwKd1HR4La?usp=sharing)

![14a.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/81c8dd56-cb34-4fcd-8312-7edc619cf41f/14a.jpg)

![14b.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a33a74f-c255-43a3-9707-bc8f055768c6/14b.jpg)

At higher values, noticeably more saturation, contrast, clarity, lighting effects, also lots of “wisps” or bokeh-like bits of colored light.

![unnamed (2).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/247c9fd8-cd45-4777-a2e4-c65d71a1c71f/unnamed_(2).png)

Definitely not all prompts will do it, but its tendency for increased detail and light seems to manifest this way sometimes. That said, I like this picture a bunch.

And at even higher values, I notice super intense cyans and magentas and other colors lining everything, giving that *iconic high clamp_max look*

![unnamed (3).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf491a01-e411-426e-a9a0-74a45c34eaf2/unnamed_(3).png)

![unnamed (4).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b06ddb32-8451-41d5-a9cc-f3cb42cc23b8/unnamed_(4).png)

![unnamed (5).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/882c0f0f-8ca2-4d2b-8dc8-f8defea005b2/unnamed_(5).png)

These two were done by Kai from the discord who let me use these for an example. Lots of light and lots of CMY kinds of colors.

As you can see though, **Clamp_max is a very powerful setting** and affects the output significantly. Part of what your optimal value will be is preference, and some of it may be dependent on the artstyle you are going for, where paintings with a faded feel may suffer from the exposure that a high clamp_max brings. 

A super interesting tactic is working with skip_steps and clamp_max in tandem.

As I’ll talk about more later, adding a few skip_steps on a run may help as early steps can be more unstable. However, skipping those steps can also diminsh color a bit.

Using a perlin_init helps a decent bit with this, but it also is useful to raise your clamp_max to compensate for color loss.

*Update 7/21/22: some studies comparing CGS to clamp_max as the two parameters go very hand in hand. Without getting too technical, CGS is what helps us generate a value needed to predict the next step, while clamp_max serves as a ceiling or maxmimum that that value is allowed to be, so we’d expect some similar effects from raising either,*

*but far from the same.*

*And a study on clamp_max against steps to show how extra steps can mitigate some of the color issues*

full res can all be found here: [**https://drive.google.com/drive/folders/1JEsJcO5z40jIvBbzHU2eh5bQnP8StE89?usp=sharing**](https://drive.google.com/drive/folders/1JEsJcO5z40jIvBbzHU2eh5bQnP8StE89?usp=sharing)

at 0.45 clamp_max

![2 cut batches clampvsteps.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0aecf2d9-c1b4-40bd-b34d-b3a386f5bb44/2_cut_batches_clampvsteps.png)

4 cut batches, 250 step

![Screen Shot 2022-07-21 at 2.47.51 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1457d5ac-cdca-45aa-9253-429dfd930015/Screen_Shot_2022-07-21_at_2.47.51_PM.png)

2 cut batches, 250 step

![Screen Shot 2022-07-21 at 2.48.08 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/365baadc-1cc2-4f32-b549-c7029c93aa90/Screen_Shot_2022-07-21_at_2.48.08_PM.png)

## Perlin

This is a setting that really isn’t talked about enough, but to be fair it’s not super intuitive. Doing some research on what Perlin noise actually is, I found that it is an alternative way of generating noise as opposed to gaussian noise, which is the more classic one. It seems to be quite popular

From the [**wikipedia page:**](https://en.wikipedia.org/wiki/Perlin_noise)

https://lh4.googleusercontent.com/lrkUmLXEeFxdQJj6X3l6cdbun6dstl4t-RXQroIDUHehaP7zf2UDRGUPERPSUdjabvCCaSMIKd4bQwx4ULPTtnEpY0JwnCZA3uZfMb_-NkkAOHKR_GPPQWFSSTSQWTMJx9XojIiE0frvnt5kbg

I’m unsure of how relevant that is to the use in AI generation, but that little blurb was exciting enough to get me to try it. To note, checking Perlin_init will not have any effect as far as I know unless done with some skip steps, much like any other case when using an init**. I’ve only really tried 4% skip steps,** but it is on my to-do list to experiment with.

Here’s what a generation with no init, 100 steps, 95 skip (99 and 100 crashed it, but those last 5 steps will barely affect the image) This is just simply the noise used for generation, denoised without any actually processing

Here’s what a generation with no init, 100 steps, 95 skip (99 and 100 crashed it, but those last 5 steps will barely affect the image) This is just simply the noise used for generation, denoised without any actually processing

![unnamed (6).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea1cb4d6-0681-440e-86cf-c5413b28f09b/unnamed_(6).png)

Now here is what you get when it is done with perlin_init checked. More or less this is what a base perlin image looks like without any noise overlayed it.

![unnamed (7).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/22b37dd3-8ced-4b8e-a8b5-b0db6ce86ff4/unnamed_(7).png)

*Update 7/21/22: probably one of the coolest findings I’ve had in a while, varying skip steps while using a perlin_init*

*Full res can be found here:* [**https://drive.google.com/file/d/1pcL-En7IowvSqpdm0ZO_C3cv3xg5apen/view?usp=sharing**](https://drive.google.com/file/d/1pcL-En7IowvSqpdm0ZO_C3cv3xg5apen/view?usp=sharing)

![Screen Shot 2022-07-21 at 2.50.25 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08dde8e3-8608-4ea3-956d-dd98ca8b3239/Screen_Shot_2022-07-21_at_2.50.25_PM.png)

## Models Part 2

Aside from the model set I recommended above, while honestly super great, It’s interesting to see the intrinsic traits of each model and how they perform when combined together.

The best explanation I can give is in the comments of this post. Keep in mind these were all done with the secondary model, so unsure how well these results will carry over to when running with the Primary model. I am however looking to try something for that, probably less prompts as I really went overboard with this and spent more time than I’d like to admit. These were all done with these parameters, for the sake of replication

- 1280x768
- 500 step
- 4 cut batch,
- default cuts,
- 10 cut pow

[**https://www.reddit.com/r/DiscoDiffusion/comments/tv0jhj/the_fattest_model_study_i_have_to_date_and_still/**](https://www.reddit.com/r/DiscoDiffusion/comments/tv0jhj/the_fattest_model_study_i_have_to_date_and_still/)

What are these models though? What is a CLIP model? 

They serve as the middle man between our dataset and the image generation. Often referred to as preceptors or networks, they serve as the eyes of the generation, looking at that noise at each step and judging how well it matches our prompt. When I mentioned Clip_guidance_scale earlier, the loss score is produced via these models. They are seriously elegant pieces of work, ranging from a file size of 300 MB to a few GB I believe, yet trained on a dataset of 400 million images, a dataset I imagine has to be well beyond terrabytes, on millions of dollars worth of computation and it takes weeks to complete. These things generally have millions of parameters that all go into its decision making

The way I like to think of it is that **cuts are the amount of looks the program takes a look at the image, and the strength of preceptor models determine its quality of eyesight.**

Now we’ve got two main types of preceptors that are compatible with CLIP at our disposal.

**Resnets = RN** and **Vison Transformers = ViT.**

For a while, Ai Image generation generally used only one preceptor in isolation, but thanks to our devs we’re now able to mix and match these together.

Across the board, it seems that ViT’s are able to outperform ResNets performance/memory usage

![grph.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44ae285b-2896-4a87-a589-badbe1b4d67b/grph.png)

**The highest two blue/purple lines are what we’re looking at here, with the dark purple representing ViT models and the light purple representing the ResNet models. The y-axis is a measurement of their score or accuracy with higher being better. On the x-axis we’ve got a measurement of how much memory they use (I think that’s what a GFLOP is) Note that it’s logarithmic and the data usage increases exponentially as you move towards the right.**

The thing to note is that the ViT model performance are all well above that of the RN’s, even often at lower memory usage, showing that they win pound for pound.

They work quite differently, ResNets are neural networks that are used for a variety of tasks whereas vision transformers, like the name, are designated for visual tasks.

![Screen Shot 2022-03-23 at 5.30.08 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f15906d-4ab6-4b2f-9ec5-23d7e923ed15/Screen_Shot_2022-03-23_at_5.30.08_PM.png)

Here’s an image depicting how each one “sees” What you see there is somewhat indicative of their intrinsic style in disco as well, where ViT’s are more crisp, detail oriented where resnets seem to give a smoothing factor. I’ll talk more about that in their individual sections

I’m not gonna show all the images of its mathematical process and all that stuff as its honestly all pretty beyond me and not super relevant to what I’m studying here, but if you are interested there’s a couple good papers on this stuff

https://www.youtube.com/watch?v=TrdevFK_am4

https://theaisummer.com/vision-transformer/

https://www.youtube.com/watch?v=oDtcobGQ7xU

## Resnets

The available ResNets we have at our disposal are (from lowest to highest memory usage)

- Rn50
- RN101
- RN50x4
- RN50x16
- RN50x64

The number you see after the RN is how many layers it uses, or “neurons” if I have that right. So one’s with higher numbers generally have more parameters, and we would expect to be more powerful and memory intensive.

This isn’t always the case however, there are a decent amount of times that rn50x4 beats out rn50x16 in the [**artist/clip score study by Lowfuel**](https://docs.google.com/presentation/d/19vDLV1fCOrJ0tpsXK4HMtjVOH73rjglrDSqHvhM3yio/edit?usp=sharing)

![Bildschirmfoto_2022-06-30_um_22.51.35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0334e24e-164e-4dbf-8901-d811fd8cd69e/Bildschirmfoto_2022-06-30_um_22.51.35.png)

And here’s a chart for nerds on some of the different characteristics of each. Nothing really relevant to immediate image generation, but more an offering for the curious devs out there.

*I can’t find anything about it online, but some have claimed to me that the larger RN models include the lower ones, so RN50x4 would have RN50 in it.*

*RN50x16 would have RN50x4 and RN50 with it.* 

*Either way, I’m pretty skeptical of this claim, and including the others definitely does affect your output as outlined in my model study.*

## Stylistic evaluation

I have spent more time on models than I care to admit, between the released experiments and just other stuff I’ve messed with and have sort of noticed some common traits to each model.

In general RNs as a whole have less definition and are more smooth/blurry than their ViT counterparts.

*This is an evaluation based on running with the secondary model. These comparisons are made with other models in the mix, but that’s ultimately how we’re going to be using them in practice, so I believe there’s validity to it*

### RN Models

- Rn50 -
    - struggles with fin edges, does thick poorly defined lines, more painterly and colorful than RN101 (xa)

https://lh5.googleusercontent.com/l2PDdV5FDFBMk47r-tj_Ydj-q_CADfIV3asTnQmz40zghZHGSRPTjALFrVwvdHO3vhzQKcpnZA26ERK80hUE1DzRMyKw-XPG2CXFsHAIW2FYrgzF1cEbqme3i0QdIANkrprF8Df5Hb6zlU1wOg

https://lh5.googleusercontent.com/y-KJMeJHWKUssx8eujyABVqC0FjswNvaBPOlGDpnoTg7fP2V5BYd7tHbG0oUtA5SvmTpFW5NUlFhJm48piNYMZs3W5nPJiZZUV5HvFWBfssFIoxb_HBKMBOkdrOKozUNzHWqUyTWUsZSMwX1Yg

https://lh3.googleusercontent.com/qQ4bJbr_mhjpLrteb8pWF1S7BuA0tM0Vn6DThkg8SEnMoJ3tuzgLmO-aXno_XjpwWvxaivJ4PPxnPpg07yI_F2Lbwkx1TJkTmN7jEzlApryd0Ir7d5LQYTYTFZXDNspBBpDhyZKhsdyRtxuhiw

- RN101 -
    - RN101 is generally a bit of a leg up from RN50, as I’ve stated before, for me its a one or the other thing. Colors are duller than what you see with RN50, but also is capable of dealing with finer detail, small but generally improved from rn50. (g)

https://lh3.googleusercontent.com/jLaQeWZCOmC1gRjPlU5QduG04Misi4J8c04mfQ9B6LCG-UeKFo9aJ_IhDhvJSUbidufOF_NkOpBNpHt-pS9NjMrIUkpD7NxBbue0Ncu5bNbkObkJ_vV4NWSm5ynVj6MAxlUsxY2G7wtENZ0reA

https://lh4.googleusercontent.com/LDQ37L9S6k0yNfJY0kWnHRg0cRJ4zD1Q_JQXS6DbPK1uuaMsSw3MElhI7jXQU6zSCjV0Mh1v0WpA7wbupvmcURbd5CgFlRV4f4LPtcjPcFofbn3YRDqe1f3cHHR1YhR7p0fIavdt4e5bKuiC-Q

https://lh4.googleusercontent.com/qIc8EXvnkvkAPSp3HThMRxgr-U0IEbQ2mKN5IszLV3cHASXVAaadnrzcmp8ZPqjo6sAnqeXhBxkbrHiM2ls-T586-XiexMUnQfD1-hGfiZS-uVI6rYVLbMQxNAIHHIh3o4REpOXpifuVELxMWA

Everything else held constant except for trading out RN50 for RN101. Other models: VIT32,16,14 + RN50x4 + RN50x16. See the [**model study**](https://drive.google.com/drive/folders/1zL5cIf3mbz3jLkikbUHDvmmGmx2S2MrY?usp=sharing) for more details.

*while Disco seems to have a bias towards pink and magentas in general, it is frequently more evident when RN50 or RN101 is in the mix, here’s a [**model study](https://drive.google.com/drive/folders/1KLemsdpFJbW6U1ZeYh0MxIQXv-A2U_ef?usp=sharing)** I tried where I noticed that, The images labeled A&B do not have those models, the others do.*

- RN50x4
    - Has a slightly cartoony/comic book look, i’ve noticed this and heard it from a few others as well. I’m referencing this in relation to its big brother, RN50x16. Not saying you will always get that kind of look, but it has a flatter feel than rn50x16 (i)

https://lh5.googleusercontent.com/IDjVI8XI3JiXsHH8FgaqwjNps9AQt34CBtjg7iDbl0ZDuBt6ZSC_XbM_qT1dXM03Us1OuQqeCLRRORzfg0l7NulRf-z6_cmVgdajxJoA5sKe6bUo6OzPzr481JzjIroI_4wRJsHAoleugmT8JA

https://lh3.googleusercontent.com/PkPToWcAKjLBHg-mtjGkocx8KrappC3RDlZDhG_746cE9JB8gfF_LtVyxfIxQtvfmNAoNlJQZrmhjnNwRmJsVQMQxRoYVVGDgugFRIqx5k5Iw4xFce5q4S7XpeLPBsNjSGEvUGvPPqsx7-nCnA

https://lh5.googleusercontent.com/rPalWmuZebnym81naFvLp9gYkaaiPc11BUf3ZTYe7xu8s6gxT0escf4BPMO1baC8U3rLE1kzjx6y84dVwO4KRKUNtaDQWYe3AwX0KUrNaOS8juCvpSYqKemlxUlplzrLH9GTPfmMoSK_4TUeGQ

https://lh3.googleusercontent.com/uNIwvU5QwYqX7IgENLVfPSehFY_OQOcSK_FI-a-VLP7Cc1eAknHSXEwFgaejwDATz_pzUIQ6JFRZyoKaQpaiszZjcErcY8QNI-F-tk5UEJMatvjvoYL2zKJvIIaEXPVLwoFar49sA-3Y8R0TIA

- RN50x16
    - RN50x16 I think is most notable in the depth/space it gives an image, very very distinct look, it does well on “unreal engine” “volumetric lighting” type of stuff, just the way its able to recognize how light reflects has consistently done very well. But in terms of accuracy or CLIP score RN50x4 does win sometimes (h)

https://lh4.googleusercontent.com/qVa-H1WVwLSykpUmVN0D1iPoJXL4hzKliWeDgz2vRN7P09EYIaK018UIWT4t3G-xFdjuFANUSGn1jpFgIBp5n1OioBUh-C8TY_CN72-7NOuDQvIxDt3i17raiKWze10ewnrbC5kh0vQdocSy-g

https://lh3.googleusercontent.com/XOW_XJXhg0EP8WZ9eGPwcyIG2uWiia7oj845X_slLDdfCj72JOfsStht0ll5spEsx5D2jqtEydR9EjdOQ_E8vTfgyRkwzDCmobHZ8E8tH2HfjtnHJYvRsnqdx3zvzWxp1XBGuSlFPWZRG-hv2g

https://lh6.googleusercontent.com/mI_tXB7Ev6-LCf4mCriGCLcQPu-tGoXM8g5RMrlE-ZPZw1pTjZC-A_Fs2H-Hxd8jCI11Bp_6QBYMvwuiIIxKqrcB_rplWgRuHtbpIEOKVbmHHKl9R3Y05Afp41Cq49nR7UNmnxM8ifGTczOKiQ

https://lh4.googleusercontent.com/E7AXVUM1Y-tQwZqHdu7KMqLwvIC35gHEy-mNvHwU5rDnDV1L4EE7vjFSNfeYTHlveDJVgVCVxe6Q1ZxXLzJEIll2jkrQMc2bY_awYLbDUJ0EjZXlGyUNXuXwDEVWYqzZA1c8jRPqfFoPZre47Q

Also, bonus pic that included rn50x16 just to show its iconic spacious look

https://lh4.googleusercontent.com/xfBuk3EXEeqSpw7yB08Cy1unqpNl_z5v-WRMncD_7PJiX-ewKnhxL_lJ3fkm_6ZJZQw5Y4XDUJA1jSJMpjvvI8a4KMpalLJgs12ETTc_gZDYyrDWg-UAxH0G1XW_5nIBZC4lCMahc88ymdD9nA

- RN50x64
    - Very distinct cartoony look, especially noticeable on the VITL14_336 comparison I did, I love it. Really nice for some styles, otherwise it’s just an unreasonable amount of memory usage to be honest.

Don’t have a same seed with/without comparison for this in the big model study as I only recently acquired enough memory to run rn50x64, and either way, Would not be able to preserve the same resolution/cuts to run it with the images up there.

I also noticed that when the largest models are in the mix, they just take over so much and add so much detail. I think it's a more fair comparison to compare RN50x64 to VITL14_336

While not high on my priority, maybe I can rent out an a100 and do a run with rn50x64 and one with vitl14_336 on these prompts, just to capture how much of a difference they can make.

Something I'm still struggling to get a grip on is how RN’s mix with each other, as I mentioned about how RN50 and RN101 together makes things weird.

ViT’s seem a bit more intuitive in how they work together and tend to be quite synergistic, but RN’s working together in tandem I would think takes a bit more machine learning knowledge and i'm skeptical about how to best mix them.

Many do 1, some do 2, some 3, but not too many do 0. So their presence, at least stylistically, some influence from RNs seems to be appreciated.

At least for running with secondary, for my RNs, I’ve typically gone with (RN101 + RN50x16) or (RN101 + RN50x4) Also a bit of experimentation on (RN50x4 + RN50x16), but it seemed things got weird when doing this? Images felt fragmented at times

I personally find, that while (RN101 + RN50x4 + RN50x16) gives more flair and dynamic depth, it seems more prone to mistakes or other blemishes than the first two i listed, which were my most reliable

Take this whole section with a grain of salt, these are ultimately quite subjective, but I have my study at the top for you to make your own interpretations and opinions.

### ViT Models

I would say in general these fellas carry most of the weight, or are the bulk of what makes a good output. An output made by just the 3 ViT models (not including VIT14_336 as I believe you’re not supposed to use both at the same time?

And as of said a couple times VitL14 is the most powerful model out there that we’re able to use, even more so the version trained on 336x336

First, a little bit of dissecting on the naming system

For example ViTB-16

| Vision Transformer | Model Size B = base, L = Large, H = huge (although we don’t have access to one of these yet) | Patch Size (Patch Size(in this case: 16x16 square) |
| --- | --- | --- |
| ViT | b | 16 |

The order of lowest memory usage to highest memory usage (and lowest performance to highest performance based on CLIP scores)

- ViTB32
- ViTB16
- VITL14

So now there’s two trends here you might notice

1. The smaller patch sizes tend to do better/use more memory.
    1. Don’t have a good explanation for this that I can feel confident in, but I suppose when comparing vitb16 to 32, you’ll have 4x the amount of patches on the image/cutout. Which I can imagine would be memory intensive, additionally
2. The numbers are all in interesting sizes, 16 is half of 32 but 14 breaks this rule of powers of 2, why?
    1. All of these divide evenly into 224 and 336, which I imagine is the reason for that. If someone can confirm my suspicion

Here’s some fun, not painfully complicated images that give a brief overview of how they work.

https://lh3.googleusercontent.com/xL4MW0HyI7Pn8UJ9E5tQVr-RdRFNmyik_H4IK0tQrZw_bYudQFCbD639r2sFUCd0rPAnKHz3LYnhE5colVywiK3Q0KYJLzF-iKyTe-6kc-K-LvQWF7BEUGfouvt4awWgTNcu0Y2KoHYH3dmBRA

https://lh3.googleusercontent.com/HKCanIMoWlVYW8Qd90FZtUnvl_Uk8HdKMohwQvwlN4NatS-AIzrAic7MsRFH5NSEXTSpFOhn_AJ3Tod-1bi2U6mu9c_fgFoK4DBHRB0_59dvh9giuk4V6qAT8PNsoQ0HrTkdoqxzPZGdH3rtgg

And I’ll leave another chart giving details on its parameters (again, this won’t be on the test :D)

![Bildschirmfoto_2022-06-30_um_22.51.43.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/06546164-498d-436a-8dfb-862e90dfe465/Bildschirmfoto_2022-06-30_um_22.51.43.png)

**Stylistic analysis of each ViT… sort of**

It’s not so much of a “style” compared to the RN. More just levels of coherency and detail.

Honestly don’t have a great answer for this as I’ve never run just one Vit, I really don’t see any point to unless you’re really really crunched for memory. I’ve seen runs on just one ViT, even with VITL14 working on its own, it's a bit lackluster, and the main point I’ll make is that you’re simply missing out not having at least 2 ViT’s in the mix, make use of this beautiful ability to combine preceptors

However, I can say a little bit from running on my big model experiment [**(ViT16 + ViTL14)**](https://drive.google.com/drive/folders/1WPEXyMcLfHSeuSBZiI7_lqPJQcOwYlxw?usp=sharing) [**(Vit32 + ViTL14)**](https://drive.google.com/drive/folders/1XJj1U5q0GFmj73ukz0porFPpF1cPGQPx?usp=sharing) [**(ViTL14)**](https://drive.google.com/drive/folders/1azhbVOd0j1FJYPTQvVWBky1BJrQg4Kdz?usp=sharing) all 3 of these combinations with RN101 and RN50x16 to keep constant

- ViTb16, without a doubt more detailed then ViTb32, brings out more color as well. (d)

https://lh3.googleusercontent.com/PnJ5oODmimSqUCYg2CqFB1a7pYGFpJMfoE2GXSjNmxYyRJkhOc70FWqlTnrIqm3NScozRxs8B7ija_V5Irnh40FIes50hUw6pUGgp-i03kYFO_Irip1pygOjzBg8ZHIUoEXXbY9b6cfYEK6Y_g

https://lh5.googleusercontent.com/YfRcCVWC8qg3REbHlS5r1ZXSM0lb6T3vLBi57vVAWQLLyaDD3LgGX2OW1eq6U8QZ8JvZV_3FhNX5unCELQx9KaO5lrHRL9834PlTT6czuh_dzYEeUXLjiffHL18zaWV5YcG_pyWym0i7aRX8fg

https://lh6.googleusercontent.com/zekleot0RyfnLXa0LwBypxKi1XSH1tCgLMqPL6szA6evgMLbYX3qLRi3E7zyQf4qZVh6ikl-Zyo43hTrQlBpuHVWMxglGJlpMWwq7lYQbFe_9ECP9DhHxARG6scHwJ0zO_OSJk3s6_ILYdbjSg

- ViTb32, less detail, but also can offer more smooth textures, feels neater, cleaner, sometimes? (a)

https://lh6.googleusercontent.com/F6GPDR3EzdMxnZg8jKX_bP59W89m3S0PI94jTXwHZ1kPOSIudt-_nbJAaasZuAzsnQR1WD82oKwnZ4dmu9yJiI-Lsnwg7JRpyhLRKaS1Ifyg3SDjT0vPf2Zfv2bdjhPbBH8O2YJswMLw005iTA

https://lh6.googleusercontent.com/Q70el4K9LUdd0Jz9KdeXdZdu3lqaCD5Bof8eheJcduu79vdy6ohCXoLzEkZOcG-q0Z4slw1plqnGfYiXTa2L-mEV681Y1soW8teodXDjhCc1VrVB-Qc_cJ-9N6u1SG-aOrsemZOZ8i5G8L00Vg

https://lh5.googleusercontent.com/jquVvRWYqwKFr-20BY4TiPmL9rBuFKZfSzG7CxT7-EUaDEmdZUou7AuvxQ2G7_fV3TxPeEI_SjBZSjZppcQOBhcqI1ymvoaHWattXhG1knbn2Eno3OVc8y2-pOFntMAxPgdAvXlP8SYtGfzRIg

- VITL14, everything just looks better with it lol. That’s all I gotta say.
    - For this comparisons I’ll do Vit32,16,14 + rn101 + RN50x4 + rn50x16 (g)
    - Vs Vit32,16,14 + rn101 + RN50x4 + rn50x16 (same thing vitl14 removed) (xg)
    - First will be with VITL14, second will be without, it really speaks for itself

https://lh5.googleusercontent.com/tAWpXseshBQ7P3ntRtvypLGD_h09-aSZpaYAnwSOWUO3WAxEWLtI4O7osf0VagNLY6RyiwJuiOgbn65YiD5VsO446YGWXsbbiINa60qL8CgLgp08Jyn87Mh6seRfKowiSXHWTc3bhCEooTLu8w

https://lh5.googleusercontent.com/J9CRah-ZAdHQiX1iC44ZXGIELguHwziZcQLe21Hwu_ArFzx8b-4KVwzv05cxJFREWsZJ2z9E0wh8rsceJuuRSZ2fWSbSMMlizFXmICrYyr11ns9-fDqtEaUwWa9r-j9cGtPYbWr_84Xq2jsZmg

https://lh4.googleusercontent.com/wQBrVVeFI8AYaF4_PtV5kNTzDkHtMkINYdDoJbtugEvOdSadpJ-mCpb0RrgrydhnrI3qdzI-X_jf17lCaoo5OqytelDXxbx34W_9pHbfCkunZeO2UDRg-HWIon-euUNAWH3Q0_EpfFZxkaA1pw

https://lh6.googleusercontent.com/3OjZv_6HFFg321AdFVeSRdmNhyMllO1tN7G18OOJ-i5NHRPmfKtbngdTXwEhuutn2_THNYQJoRnHl1n6snRw2G_C9gqniaoR41edHosZK-xkwPQk-zN8PzDf5vV6gLqEyDuwchhMJCH4GpmMoQ

https://lh3.googleusercontent.com/yNC3CxUgJuJIVQFiKLNDFrw4nAIUt9prc1JCgEqCjK4NkEHhwfkPElS8o4z-ZK1WQs9acHKEAsrkLcUlxZvwlE00HbTJKJGl4YW2_uljyPO5Ke3CWmXF2U9TFCPM5ufZ47lFSZ45unztYxJHIQ

https://lh5.googleusercontent.com/xVVBVwhGwHggjG06fFY7lIPzENK7rakP1_epHO-LumL2JqtifShqBBFif_dx8l98bh1ubolQDe1GNAtzKXk-ylfdHBk9wB4OeOdMKMX3y7z3_euwzN1fJUegDfeBNBv7c6RxTuzL1_DMt0IFRA

I don’t have any documentation to support this, but the way they stack seems to make more sense as to why it may be beneficial. Each one having a different patch size allows it to cover its own ground. So while Vitb32 might have a broader view of a 32x32 patch, vitb16 will squeeze 4 patches in there to get in on that finer detail. It seems as if they could work off each other covering the ground that the other missed.

*It seems to be a very common trend in Clip guided diffusion where successful methods involve you both a broad scale view and close up view simultaneously, i.e. overview cuts with innercuts.*

Anyway, for that reason, I have all 3 on, all the time.

I would say second best combination of ViT models is either the (Vitl14 + Vitb16) or (VitL14 + Vitb32) Each has its own flair.

–

Before jumping ahead right into playing with models, just want to remind that it’s definitely one of the quickest ways to get a CUDA out of memory error. Here are some charts that show memory usage based on # of cuts. Thanks to dicknascarsixtynine for these studies.

https://lh6.googleusercontent.com/KNB7xasugOqRxuTEbVU4_jV49GuVOwIPbDxto8Cxz3CKxXt5DUsfoco-KxOx9LhftqLGZbeTpNjjUQZvmNy2LLtSrt8XOhAEZVBAWEQ21kHjLml03wD2w9NmtuhpDsxZb6dkY7FFH4kPcRemCA

## Diffusion Models vs.  Clip Models/networks.

So, in the previous section I talked about **CLIP models,** which serve as the critic of the generation, looking at what we have so far in the run and assessing whether we are moving in the right/wrong direction, hence the name *CLIP-guided* diffusion

**Diffusion models** are the parts that work on the noise each step, erasing little bits to reveal our image. 

However, without CLIP’s guidance the generated image will have no adherence or influence from our prompt. 

I like to think of the diffusion model as a painter and the CLIP models as the critic or teacher. And with every brush stroke, CLIP will tell our painter whether it is doing good/crappy job, and then our painter will adapt to this feedback to minimize its errors. 

Another way I like to think of it is like a game of catch. For example, CLIP, at our input, asks our diffusion model to throw a screwball. Our diffusion model has the skill to throw one (it’s within it’s dataset), but it hasn’t really learned what it is. So the diffusion model will continuously attempt throws, and CLIP will tell our model whether it is getting hotter/colder. 

CLIP networks include the ViT and RN models.

Meanwhile our diffusion models include: 

512x512openaiFinetune, 

512x512OpenAi 

256x256OpenAi

finetuned models

as well as a few others like cc12m (although this is not in the DD notebook)

Important thing to note, and something that confused me at first. **the 512x512Openaifinetune (default option) and CLIP models are trained on different datasets.**

**The diffusion models are trained on Imagenet:** an extensive database of images used for object recognition tasks. 

**The CLIP networks are trained on the CLIP dataset:** which is a webscrape of 400 million images

although this is a video about DALLE and Imagen, it gives a lot of insight into how diffusion works: [**https://www.youtube.com/watch?v=xqDeAz0U-R4&t=754s**](https://www.youtube.com/watch?v=xqDeAz0U-R4&t=754s)

<aside>
💡 Also see this to see how individual models perform on their own and some of the intrinsic biases they have! Although this was made with secondary model which may not carry over as well. https://www.reddit.com/r/DiscoDiffusion/comments/ty3m5x/trending_on_artstation_over_each_model_to_show/

</aside>

## **Noise Sampling options**

At the moment, we’ve got two options for our noise sampling method, although there are many more out there and I hope to see about integrating a couple others. DDIM/DDPM and PLMS. PLMS was heralded a better alternative to DDIM/DDPM, being able to complete an image in less steps and at higher quality, but this [**claim**](https://twitter.com/rivershavewings/status/1492881407940579330?lang=en) was made based on programs that work a bit different from Disco.

From what I’ve seen, I can agree. But Disco seems to have an issue with some really intense grain. I am currently exploring PLMS sampling on JAX to see if it has the same issue, as that’s one the most similar notebooks to Disco.

Here’s some images that showcase that iconic grain: PLMS on the left, DDIM/PM on the right

https://lh4.googleusercontent.com/w1HuzSgQyB-enci0Zj-gW48b6nHuJaJgXhxe20_E8WWBEkLGFigEBJgNOyUZW6wk8n_TbAU7QbkyfTO68EuVrm7bSi1iZNDEQ6y17WW37_OsYlz9IxvZ_YU2DQ22nOOMOC3Lh-CqDuqrvnj10A

https://lh5.googleusercontent.com/GbxHfF1j6NOfmz0dZE0k4GHhVuddeX2xVre0m4t7EJ8tt7rBFag774tPmlOgL0KflWJ0kff2JyeMHtJZJpvYsqUJn_jPX8zb8SAKYH0P78XLET7NlVC6LDhBenEamcUSL-kxYw_YUFftQoKI_w

https://lh5.googleusercontent.com/Alz1UHAoer_xnYSUVO9Xj9nToXr4B-JcNTdOJmM5nqt6fT2-HCCbmOepMkRH9GtXt-KqvFQ-7moCyncHEcLvChcxA2pLDBiGh7NmxMFbCPmxUFxNXMYB63EvI8X_xMJGYRDqzzSzXnHfvEFhIw

https://lh3.googleusercontent.com/DyRFn0EuPsjf8uX6gOECYa8eEzTIYj8h2B4xNTJm61YVaNZbn4PhJj05KzGQdKDdqsgqceJrOPEibawVLCPMlQd8-Y0KsHyLkh1NBdVSCxLJ5khbalaxk8OTzI9bj8iSO3DgLpR9YQDULJ9vsQ

https://lh3.googleusercontent.com/dh6k_zI5e3bAySZ4VZ9zWZRrdncMeAO47SdD844OET1WooFN4OZ1Fn9q2C4TD7MjUsK3qq1KfLt-Jf54faE87J06SwZk1-VFjtl4fUVG4uXVcqAlt4b6jgVqweG766IwrvsMZ8xBICTlKBfxbQ

https://lh5.googleusercontent.com/yl7aCYNJu0FjTKr3_kASBjyEJzSzDGMfewnYoBAKU2jf95GPfla8BT8Q2mmmBxux294j5PDFzBk7JZoGWlFgP82nvNrP3fTPAmabPwoupMDvQkcc5crrhFnZm3ew1mq72VEGn1Hz1bUw8Z9F9w

Sometimes it can get really bad, like this this one

But they’re not exactly bad images at all, they just go quite a bit overboard sometimes.

I’ve tried to resolve this in several ways. Mainly, **lowering cut batches and/or steps** which I have had limited success with, but I think it impacts the quality and composition in other not so great ways. It may also be worth trying very high values of tv_scale, the values I tried didn’t help too much, but maybe I haven’t gone high enough? Here’s some images at 125 steps/1 cut batch, about 5x faster than what I normally run at. And if you skip let’s say, maybe the last 20% of the steps, you may resolve some the grain issue and that’d put you at 6x as fast almost 

https://lh6.googleusercontent.com/VaM1zn47cOTOUVfmezhgoxeO6jRQR9CTgPo9CFoyeKMTvrbWJDrFwR0kxrb35M6-fulI1APcp6Ln8UhioPRi3ScGkoiJw5P6uXvXfekmzCj2lpzeidnwuZC36UxhqN8JLyP71QhRCbfKiQCJLA

https://lh6.googleusercontent.com/WOGJ9bZ6GYBYBdsXLG5o6f_R1B0oiDwQDj4YuRDV2SPZvkO1Gfd2V5ptY42KJGpGvy2xnEV3Zh5lVCNRcF8eyFi3foSAtmbadapr7bkBxB1jsjHxMVlyefsZpsGj0G2xBD8_tu8XbpPxuCMdLw

https://lh6.googleusercontent.com/cz9pMf6ypruihgoO5VsIaKc8gJZEqxPxAUZii1O9NpVxIcyUUlshlf783MdyOnu_Nuao3L-qxHtqFBh7Pm0SUoZ37TKwOabm50C2QqzatEH23LJCXODHr9LvCROjHbFP4JrYqKZI9rAkJtkQgg

https://lh5.googleusercontent.com/PXfomXtDVQonaGE5GxJQWpZ72LeGQmscSzYbUCnSdC5WJKoqX7iBJ6gvlpsK9jgoKwh00xbAL-0Adl0Ov1RbrGqY_C1aksBpAUO5HIGJam4-FreGBc2ru2KTB6dy_THTeEAlcSIYvwkJjQpseg

These were not so bad, but a lot of others came out so terribly distorted or devoid of detail. I also left a fairly high clamp_max on this for the decrease in steps/batches, so that’s that overexpose/oversaturated look you’re seeing.

Some others have suggested that it could be from a few other things such as Resolution or model sets including RN’s  or honestly it may just not be super compatible with our program altogether. But seeing the potential in these and just the idea of this thing going faster, I’d want to look into it a bit more.

**UPDATE:** I’ve found something of a solution, or maybe better to call it a workaround that I’ve included in my custom notebook. It involves using PLMS for a portion of the run then switching to DDIM/DDPM for the rest. Trying values around ~50% should be our zone of interest, so we can benefit from the composition boost via PLMS but switch to DDIM/PM early enough to avoid the grain problem. 

## Advanced Init_image Tips

Using Init images in Disco, or diffusion models in general, have a few issues which can make them a bit clunky, but there’s some ways to get around that if you’re willing to put in some prep work to your starter Image.

This kind of AI struggles a bit with areas of an image that are a solid color, especially at higher skip steps. This is because it relies on noise and variance in color to produce detail. So to help that system work nicely, we can overlay noise over certain parts of an image to give the AI a leg up there. Here’s an example

https://lh6.googleusercontent.com/EkXY1jUKFVgoQZ08XPhE-fO4jXHPI8wuTjkGC6RAOugSFLWzTMcmgklccjs0zlPd0sue2UI_Zc81tSjazHD8n4iVPpGPCE2qTg5-FhU5JR9Atl3ngCdH0lPmC5UYdPQOHnwrXrpWKMphEB6T0A

You can overlay noise over the entire image or just select parts as shown. I didn’t add any noise to the fire as it’s already well textured enough for how much I need it to evolve. Also notice how there’s that black outline around the emblem. This is important, especially when adding noise, two different elements of an image will have a tendency to blend into each other if not adequately separated by something preferably strongly contrasting. And at lower skip steps, where the ai has stronger influence, that issue will be all that more prevalent. Anyway after some trial and error. Here’s the result

https://lh4.googleusercontent.com/2xOF_wjDv53eStT0YxdL9lxHYdVQaxT1tlLlwHU4-zcslaGYIA5TE6zWg6dkqJlSKfYk3qSsZ04e3qqLWq-um1Y2f35z4nEbNznEmuPG-u5jsL6aWq7U7Y5TCYqAPdrVdSvzTHOFqOWz0sBosA

Upscaled and placed on a black background. I’m pretty proud of it, but it was also I think my 11th try. Even with all of the experience I’ve gotten around this stuff, I’ll never get it on the first try. It’s hard to estimate what the prompt is going to do, how many skip steps you need, etc. Really no matter how proficient you are, there is still a lot of variance to navigate and trial and error is the best way to go about it.

You can make the prompt whatever you’d like. That’s your creative freedom, but often I will simply just describe the init image itself + some stylistic words, so I can still have something that resembles the original image, but an enhanced quality version.

Here was one time I forgot to remove my initial image before starting another run with a different prompt. Turned out to be a bit of a happy accident.

https://lh3.googleusercontent.com/PZdsiMvoEFIBpaWlYemIx1ZriQapPG9QA554dgXqKY4wqgX7iyveIh-AljjI6vXwSIXremZAB2PpraRj1C32pLTnc0_6svXSBuM0KqiEG4s_E1E2GQR9Gy7ho2fVvjVIl5dlslZtdD1gYaLkAQ

Meanwhile the intended result was this

https://lh4.googleusercontent.com/VJdCgjuSKHqe-b0uD_VN01wGE1u5fzUu7Cx9h104cfhw_QQ8dfO2o2lRQxRiEiMrQ2JNn3O42h2N-askDzuizxrJqTcG1nzuarBqGfqUSUgDTjf7GgKhKy0avGWnYSKC7g28Jj70w96PtKBaWQ

Another trick I often use is running the init_image several times, at various levels of skip_steps. Most commonly: at 40%, 50%, and then 60%. And then I’ll stitch all 3 of the images together in photoshop, pulling from the parts I like of each. 40% gives me some of the coolest unique details, whereas 60% preserves the subject much better. Here’s an example

https://lh5.googleusercontent.com/mZv4fUOkbXSbOvs30RilsNenVanNPPRAg63AptmvH6Pwm20DMyU56ma8fcGKFumL-dqSfWeRcaggGNfT3iIxiQRQnMtwlMmW-MYy2DbfAxzpOkuN_983FbEww3U5Z8FUT1pZFL9Gf3mOZ-MqoQ

One of my earlier works, definitely wish I could have done something about the Steve Buscemi eyes, but the concept turned out pretty cool. The face and hands were pieces taken from the 60% run whereas the landscape within her dress is a piece from the 40%.

Here’s the init_image I used for reference.

https://lh5.googleusercontent.com/EvFMNJqWl3sEZ56dOddCq0vUnIkED7i3kAMt51KQV_qrNuGNDwK-83Fkt25bcdlTIi08M1Y1JNXWL42Ly9vVXsNGFKT8N6IYNcngV0HF3aRlvNPrcm9IzkynMJrlc-v88G5MqzSpTBcN2sO1BQ

Also to note, it doesn’t matter the resolution of the init image you use as it gets resize to the resolution you’re running at anyways. It’s just important the the resolution you choose is a similar if not same aspect ratio as the one in your settings so that it can resize without fitting or stretching.

You can also draw a super super rough sketch to use as an init image! In these cases you’d want to use even lower skip steps than the normal 50%, somewhere around 20-30% will do you better, as well as an init scale of 0. Also as always helps to use extra noise. This is from a long time ago, before I knew the noise trick, but check out this example

https://lh4.googleusercontent.com/7HdYJxcgEw3BsJsOXhUpNpdmPUp_m_TJyiwCgH2t5p3JsPMEV4HqEpX_rJ-TEXi9SNhl4t6xu00bEFI-j1ql8ZpXKaXuJHEsXt9sf8ms1Dtwfdw65JO_hZa-kOK29xgKVV68DgshChy0VHML8A

https://lh5.googleusercontent.com/QU9fAXU7qqUsFBiqFsnWist-u3zupYkPTd9IK5PFxRH0A0pMgPyfqijAD8xTJI7IzVVoY9mq3vTK4_7g_6S5gbwEZaboDEs40sDIZxYtJOYrcwxHciOoU1cKRvMFZrfIMHApFcKYY4ceciiXyA

## Turning off The Secondary Model

**To make this a bit less wordy, I’ll be referring to the settings this way**

**Use_secondary_model (on) = secondary model**

**Use_secondary_model (off) = primary model**

Turning off use_secondary_model is one of the biggest keys to improving your outputs. It is, however, very VRAM hungry, and you’ll likely have to turn down some other settings. See this chart by dicknascarsixtynine to gauge memory usage in relation to # of cuts.

https://lh6.googleusercontent.com/k28hslBJ71VFxp1mfApZa-BJ-se9XmWuHjl3MnlKyOflcGqouEV-UZ6iNBu6EpM4r8D_hOUCdVwxmGQt8OPRirOfgrj587nW0b-Ceyn9ylET3bPGt3tdwLNWIzDO6A13Hz7uqz4zfdBOZVyY0g

*So what is the secondary model?*

The secondary model was designed as a workaround method to allow for running CLIP-guided-diffusion on less memory. But it is also quite a bit smaller. It can almost be though of as a demo or a lite version of our real model.

When this setting is turned off, you are using OpenAIFinetune512x512 in all of its glory. Shoutout to Crowson and OpenAI for this gift to the world.

It does however take some extra tweaking and fine tuning to get it to work nicely. I originally dismissed the primary model as I got some really strange results with it and wasn’t so happy with the extra time it took.

However, once I adjusted my scale values as well as some cut settings, I’ve switched to the primary model and really haven’t gone back since

[**Here’s](https://www.reddit.com/r/DiscoDiffusion/comments/tkjojz/playing_around_with_disabling_the_2nd_model_and/)** a bunch of prompts I ran with Primary mode. This was prior to all that i’ve figured out that needs to be adjusted when using the primary model, so take it with a grain of salt. This is to be compared with the version I did [**with secondary model**](https://www.reddit.com/r/DiscoDiffusion/comments/tlwkz6/as_a_follow_up_to_my_previous_post_on_removing/). It can also be found on my main drive of [**experiments**](https://drive.google.com/drive/u/1/folders/1_d-iQzn2ySVYmnZlm-yRED4vOhgRh8RO)

Here’s some Pros and cons of them as well as some examples, as it is a bit difficult to grasp.

**Primary**

**Pros**

- Richer Textures
- More accurately reflects prompt
- Able to capture some artists/things that Secondary cannot
- Needs less steps: 125, 142, 166, 200, 250 are all viable candidates, although I generally prefer 200 or 250
- Coherent structures
- Better with color

**Cons**

- High VRAM usage, sacrifices need to be made to CLIP models, resolution, and cut settings
- Slower
- Prompting must be more careful/specific,
    - more looks can be captured with the primary model, but it has less of an intrinsic style, which is good! Because then we have more flexibility to get what we want. Meanwhile secondary model has its own unique flair you really see on every output
- A bit more difficult to finetune, sensitive to more settings
    - Has a tendency to make blank images on some settings/prompts. See my guide to troubleshooting that

**Secondary**

**Pros**

- Faster, less memory
- Does very well with landscapes, captures, spacious areas very well.
- More prone to mistakes, but some like the trippiness of it.

**Cons**

- Can be limiting to range of prompts it can capture
- Less accurate
- Natural dark look
- Tendency to blur parts of image, less defined textures
- Tendency to overexpose, over contrast parts of image
    - The other scale values beyond clip_guidance_scale don’t seem to help
- Needs more steps, 250 is good, but 500 seems to be what it likes to prevent stitching, overexposure, and bring better quality

**As turning off the secondary model can be pretty daunting, here’s some settings that should work in colab, and in my opinion, is the best use of colab’s 16gb. Sort of a gold standard many have come to love. But feel free to play with it and change things up a bit**

- **Range scale: 10k (this one really doesn’t matter a ton as it doesn’t work correctly)**
- **Sat Scale: 10k-50k**
- **Tv_scale: 10k-50k**
- **Clip Guidance Scale: 10k**
- **Clamp_max: 0.075-0.15**
- Eta: 0.8
- Steps 166, 200, or 250
- Skip steps, aim for 4-6% of the steps chosen, so for 250, 10 skip. 200: 8, 166: ~6-7
    - If using this, highly recommended to have perlin_init enabled. Mixed is fine
- Models: VITb32, ViTB16, VITL14 + RN101 (or RN50) + RN50x4

If there’s something not mentioned it’s pretty safe to keep it at the default or try to mess with it as you like.

There’s also quite a few settings that seem to have different optimal points or even feel as if they work backwards when running with the 2nd model off. I’m working on doing some experiments to get that fully cleared up.

But one such notable change is

## Resolution

When using the secondary model, larger resolutions tend to do better across the board(although not much improvement seen beyond 1280x768) And from the experiment by u/relaxed orange, it can suffer quite a bit when res is dropped past a certain point.

With the Primary model, that doesn’t seem to be as much the case

The native model was trained on images at a 512x512 size, and going down to that resolution, or at least having one of your axes be at 512 (or being closer to 512x512 in general, I am not sure on this), it actually seems to do pretty well. This is not to say that higher resolution is bad. I run at 704x832 or 768x960 usually, but sometimes at resolutions a bit beyond that, it has issues giving you one whole put-together image. I wasn’t s happy with what I was getting at 1280x768. I imagine its something to do with the stress of resizing and straying so far away from its trained resolution? It’s not such a big deal as the detail you can get at the listed resolutions is so good that upscaling them works perfectly fine.

[**Here’s a bunch of examples at 512x512](https://drive.google.com/drive/folders/1XbGLzjcBwYbGPJ4EjaDaUxEfh5DFYTdx?usp=sharing),** without even using any sort of maxed out settings, only 8 cuts. This was prior to a lot of the knowledge I have now and I’m honestly super impressed with it

**Update 7/4/2022:** got around to comparing 512x512, 512x768, 768x960 and the results were pretty staggering. While the high resolutions were able to get in some more detail of course, the lower ones were able to get extremely convincing images with ease. Here’s a full link to it. [**https://drive.google.com/drive/folders/1u-Kjz7_y42C8J1FUa_-UMQ7UsuA7YH-9?usp=sharing**](https://drive.google.com/drive/folders/1u-Kjz7_y42C8J1FUa_-UMQ7UsuA7YH-9?usp=sharing)

From right to left:

768x960

512x768

512x512

![6a.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f9a7662-dbcd-44fa-ba6a-1fbb377844e5/6a.png)

![6b.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3de6db2d-7c96-4006-93df-7a5b42a03adb/6b.png)

![6c-t.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9756e539-6a3e-4d24-86b8-382a9970e2a2/6c-t.png)

![Screen Shot 2022-07-06 at 11.46.19 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05f969d8-8ab6-403f-9c7a-23caa2f361fd/Screen_Shot_2022-07-06_at_11.46.19_PM.png)

![10b.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/31830faa-2c09-4e73-870b-8e4049690aa0/10b.png)

![10c-t.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d86b4ab8-c034-400d-bba4-c4e4bb6a0c3f/10c-t.png)

![14a.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/313aa7df-1666-4ff7-8171-99a64f99df57/14a.png)

![14b.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbfe9158-a353-4a86-8d66-eab31453f9b7/14b.png)

![14c.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/946d85b8-aa48-472b-9a5d-735c5d4bfb0d/14c.png)

![Screen Shot 2022-07-06 at 11.47.17 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c773d24-3437-4325-98ed-1ac061387fd7/Screen_Shot_2022-07-06_at_11.47.17_PM.png)

![15b.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ab2fc130-5452-496f-a990-394005dd4f16/15b.png)

![15c.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0c2a07d-87f9-45b5-b32c-16c2bbca62bd/15c.png)

![16a.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbf8891b-7d35-430b-a0b0-3ba898b7689c/16a.png)

![16b.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71cdd710-2243-4d95-947c-dcfa62b9f243/16b.png)

![16c.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03cbfb9e-a2aa-4bbb-a4d3-ed3b65657ce6/16c.png)

### **Resolution Dilemma**

This brings me to what I’m calling the Resolution Dilemma. We all want high resolution images naturally, and while upscalers are good, they can struggle sometimes when the starter image is at a low resolution. Something I’ve seen quite frequently actually is people running to a Cloud GPU so they can try running a large image at maxed settings. It almost always results in dissapointment from what I’ve seen. So how can we balance getting a convincing looking image while still getting rich detail/quality?

**I’ve got 2 ideas for solutions,** one that’s a bit less complicated, and one that may take some tinkering with the cut system

1. **Run at a smaller, safer resolution and then use that output as an init at ~50% skip steps.** That’s really it, even so, it may not be perfect and that’s what I’m exploring with this other potential solution
2. **Use more cuts, less cut_pow**. As I talk about in the cut scheduling section, cuts can range from anywhere from the entire size of the image to their minimum size, which is usually 224x224. And if you’re raising your cutPow, your cuts will strongly trend towards the bottom of that range. **If you’re trying to run at 1920x1080, that’s a lot of ground to cover for such small squares.** That would take ~42 cuts just to cover the entire image, and that’s assuming that in its random nature, each one happens to be in a unique spot to cover the entire image. Part of the problem we run into however, is that we want a solid cut pow value to get rich detail in our image, to accomplish this, we need an adequate variety of large and small cuts, and unfortunately the current calculation of CutPow does not seem to be optimized for this. Further in the Cut scheduling section, I talk about some ideas I had for it.

The aspect ratio you do also influences this, the largest size that your innercuts can be is determined by the smaller dimension. Here’s a visual for that I created using [RemiDurant’s](https://twitter.com/remi_durant) notebook https://colab.research.google.com/drive/1peZ98vBihDD9A1v7JdH5VvHDUuW5tcRK#scrollTo=NEAdjUn3RcNm

![320x1280, On this more extreme aspect ratio, the majority of cuts trend towards the center, in the style of a normal distribution, a large portion of the image does not receive proper attention. ](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adedeab8-0167-4513-9fc6-dacc954013ec/download_(52).png)

320x1280, On this more extreme aspect ratio, the majority of cuts trend towards the center, in the style of a normal distribution, a large portion of the image does not receive proper attention. 

![640x640, square aspect ratio, innercuts evenly fill the whole canvas](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/326572e1-40cb-42a2-b540-29eafaa50644/download_(53).png)

640x640, square aspect ratio, innercuts evenly fill the whole canvas

Both have the same total pixel counts, but very different distribution of cuts.

## Cuts and Cut Scheduling

This seriously gets its own chapter. Next to prompts, this is probably the biggest rabbit hole of a setting to go down.

Cuts or cutouts are a method of utilizing our clip guidance on portions of an image, repeatedly. The varied sizes of the cutouts allows it look at the big picture while also giving attention to finer details.

Thanks to Dango’s method, we’ve got some great improvements on the cut system allowing greater tuning as to when we want the generation to focus on big picture/small details, but it also adds a bit of complexity with some extra parameters to work out.

Here’s a video that visualizes how cutouts work.

[**https://www.youtube.com/watch?v=kRhd1xEH6bQ&t=386s**](https://www.youtube.com/watch?v=kRhd1xEH6bQ&t=386s)

And thanks to dicknascarsixtynine for these images to help visualize what is going on.

![Cuts executed on our image](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35f4cc75-21c2-4b1b-a8fc-299f6da30250/inner_ViTB16_cuts.jpg)

Cuts executed on our image

All cuts may be in a square shape to be downsized to 224x224 (or whatever the size is of the encoding for that model)

![An overview cut, notice the black frame padding it includes to be able to get the entire image to fit into a square](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f941b1d8-387c-4652-9646-d71c72f9c986/cutout_ViTB16_0.jpg)

An overview cut, notice the black frame padding it includes to be able to get the entire image to fit into a square

![A horizontally flipped grayscale innercut, slightly angled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/29a701db-a9f4-4d6f-96f5-f6c5c8307c83/cutout_ViTB16_1.jpg)

A horizontally flipped grayscale innercut, slightly angled

![Typical innercut](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f39bfe20-8452-4e13-97e6-f6d57177ffa0/cutout_ViTB16_3.jpg)

Typical innercut

![A horizontally flipped innercut with a pretty noticable angle](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6abff9a0-9003-4631-9104-da6e2971e245/cutout_ViTB16_4.jpg)

A horizontally flipped innercut with a pretty noticable angle

Here’s what some of the cutouts look like to the machine. They can vary in size, color, tilt, and may also sometimes have flipped orientation, all in an effort to see an image under many contexts

![Untitled-100 copy.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6bbfb5a-d442-4366-b2bb-7f726d0ad07d/Untitled-100_copy.png)

**An all-in-one graphic.**

![Untitled-101.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c6fd86c-00e4-43dd-addc-e9e2508f20a2/Untitled-101.png)

**the full range of cut sizes for innercuts, although as we’ll talk about, they often trend towards smaller sizes.**

Anyway, onto how to use this to our advantage.

By default, Disco has it set so that it will execute 64 cuts per step (per CLIP model)

(16 simultaneous cuts) x (4 batches)

Batches aren’t so difficult to get around, general rule is more batches = more detail, and a tad bit darker, or at the very least, less tendency for overexposure

This will be the section we’re talking about mostly.

![unnamed (8).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1aaa36e-680a-42b3-9596-6d699af93187/unnamed_(8).png)

The tooltips here are pretty helpful

The number within the bracket is the # of cuts for that type

The number after the * is the amount of diffusion steps that will be ran for, but for our case, we’ll just divide that number by 10 and think of it as a percent

So looking at the default

We have 12 overview cuts running for the first 40% followed by 4 overview cuts on the back 60%

And then 4 innercuts running for the first 40% followed by 12 innercuts on the back 60%

**Overview cuts + innercuts = total cuts.**

When altering these, it’s best to have them use the same arrays so that there’s less confusion as to how many cuts you’re doing on a given step in the generation.

![unnamed (9).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b4b1f85-d36a-4584-90dc-5f97fff610f1/unnamed_(9).png)

Something like this may give you an unexpected CUDA out of memory error.

Here you would be executing (12 + 4) cuts for the first 40%, (12 + 12) for the next 20%, and then (4 + 12) for the last 40%.

That big jump in the middle to (12 + 12) cuts will demand more memory and if you don’t have enough to spare, it will crash at that point in the generation.

However in this format, it's a bit less intuitive that that may happen.

So here’s a cleaner way to look at it, same exact cut schedule but here you can see where that (12 + 12) cuts happens, beginning after the first 40% of the run.

![unnamed (10).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0369503a-2b19-4dd1-a1d6-8f3bb465d91f/unnamed_(10).png)

  

So for that reason, It’s really a good idea to make sure you’re using the same numbers after the asterisks for both of these just to avoid confusion and unwanted errors.

**Also, the numbers in the 100’s must add up to 1000 to complete the run! For example,**

**[12]*400+[4]*500 - this only adds up to 900 and only has cuts established for 90% of the run, upon reaching 90% completion, it will crash.**

**In an alternate case,**

**[12]*400+[4]*600+[2]*200 - this adds up to 1200, it will be able to run just fine, but any cuts scheduled after 1000 will simply not be used, in this example, it is set to use 2 cuts beginning at the 100% mark when we have already finished.**

As the tooltip states,

Overview cuts will always cover the whole size of the image and are good for determining the silhouette or the general structure of what you’re generating. There are also a few modifications to them in the augs that further specialize them for this purpose, such as seeing the image in grayscale which I’ll talk more about with **cut_ic_grey**

Innercuts are the standard cut. These ones will vary in size, but we can also opt for it to tend towards a certain size using **cut_ic_pow.**

**Cut_ic_pow (I’ll be often referencing it just as cut pow)** governs the size of these cuts with 0 making it cover the entire image (although as far as I know there are still differences in variation etc. that makes this not the same as an overview cut) and 100 forcing it to its minimum size, which varies per CLIP model, but the smallest would be 224x224. The charts I included in the deep dive in models talk about their embedding size.

Higher cut pow = smaller cutouts, which with a smaller amount of pixels to work with, it can accelerate denoising and bring out quite a bit of detail in that small chunk.

But also as shown in some of the studies, too high of a cut pow can overdo detail, or generate multiple subjects, **almost as if each cutout is generating its own little mini image of our prompt.**

Resolution plays a role here.

In a 512x512 size image, having 100 cut_ic_pow, while I think it's a bit high, isn’t super unreasonable, each cut will **see about 20% of the image**, and with 64 per CLIP model of those, that ground will get covered just fine

In a 1024x1024 image, 224x224 sized cuts will only cover **less than 5% of the image,** even though we’ll have 64 per CLIP model of those to hopefully cover the whole image with each step, you’re stretching yourself a bit thin. **Running extra CLIP models to up this number isn’t really a solution, you ideally want them to be covering more or less the same ground, I would think**

There seems to be an inverse relationship here, where the “optimal cut_ic_pow” (based on avoiding motifs and still getting rich detail) is greater at smaller resolutions, or at the very least there is a greater range of values that work well.

In general, these cuts will overlap each other. But this is good, covering a certain spot of the image quite a few times may be useful.

In general, **5-20** seems to be it’s happy place. And **10** makes a great baseline to start with and adjust from there.

![example2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec7b0a21-77ba-44e3-adcd-15d1fcbb4644/example2.png)

![example.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef296648-221d-428b-b6f4-5a5f8d10abae/example.png)

This is how the current calculation for cut pow works. It takes a random number from (0-1.0)^(cut_ic_pow) and is used as a multiplier to determine the size of the cut. If the random throws a 1.0 you will be executing a cut at maximum size whereas at 0 it will be executing a cut at minimum size for the given model, which for most cases is 224x224. 

From this chart, anything beyond 10 cut_ic_pow will have almost all your cuts executing at the minimum except for the top 15% of random numbers, which are still generally small. I’m currently working out an alternative to this to see if some extra variance may help us here.

**Cut_ic_grey** governs what percent of the innercuts will see in grayscale. So at 0.2, it will aim to have 20% of the innercuts to view the noise in grayscale.

*(there is also a bit in the code that gives any given cut a 10% random chance to be in grayscale, so anything specified by cut_ic_grey will be in addition to it, but this won’t be too relevant for the sake of the explanation)*

**Why is this useful?**

Think of night vision goggles or infrared cameras, while you won’t be able to make out the finer details of what you’re looking at. There’s only two colors to distinguish between, or better yet, light and dark.

In earlier parts of our generation, that’s all we really need to look at, we are just aiming to get a silhouette and to have solid, distinct edges that separate objects from the rest of the image. By taking color out of the equation, it may be able to do a better job at that.

**Will this make my image black and white?**

No. Going back to the night vision analogy, we’ve now got our painter wearing night vision goggles but still working with the same paint.

The default is [0.2]*400+[0]*600 with the first 40% of the run having 20% of its cuts in grayscale, followed by full color/no grayscale for the remainder of the run. But I’ve found that there’s some good use for making use of some extra grayscale cuts at the right points in generation.

Here’s sort of a template to toy with. General idea is to start high and lower it throughout the run. I recommend hitting 0 cut_ic_grey by the time you reach 40-45% generation.

[0.7]*100+[0.6]*100+[0.45]*100+[0.3]*100+[0]*600

**Cutn Scheduling, balancing your inners/overviews**

I am under the belief that there are different schedules that specialize for certain cases, so there’s a lot to play with here. But in my opinion, just as a general improvement to the default that should still be pretty universal, you can try

**Overview:** [14]*200+[12]*200+[4]*400+[0]*200

**Innercut:** [2]*200+[4]*200+[12]*400+[12]*200

It’s pretty close to the default, but the reduced innercuts for the first 20% which we have now traded for 2 extra overview cuts, I have found helps reduce fragmenting with images. Also I have removed overview cuts for the last 20% entirely as they really do nothing at that point, and you may as well spare the time, if you’d like you can increase the innercut number for the last 20% from 12 to 16.

To make a bit of a deeper dive into all of this, **the schedule you have set for the first 50% of the image is incredibly integral for where it will go from there.** After 50% just stack your innercuts and they’ll nicely fill in the detail.

Before that point, though, they do a lot to decide the foundation of your image, especially the first 20%. You may have noticed by ~20% into the run, you have some idea of what your run will look like. It’s still far from complete, but you can at least see the outline of your subject.

**I am under the belief that you should run the same cuts for at least the first 20% of your run if not more** just to avoid confusing things by switching too much. I don’t have examples off hand, but I’ve always had issues when I tried doing a certain combination for the first 10% and then switching it to another from there.

All of this is dependent on resolution, model settings etc. but I like to play around with some other cut schedules like these

**Overview:** [15]*200+[12]*200+[4]*400+[0]*200

**Innercut:** [1]*200+[4]*200+[12]*400+[12]*200

**Overview:** [16]*200+[12]*200+[4]*400+[0]*200

**Innercut:** [0]*200+[4]*200+[12]*400+[12]*200

**Overview:** [16]*300+[12]*100+[4]*400+[0]*200

**Innercut:** [0]*300+[4]*100+[12]*400+[12]*200

The first is pretty comparable to the original one I offered, just something different to experiment with. The second one does 0 innercuts for the first 20% and the third does 0 for the first 30%.

This 0 innercut thing is a pretty popular thing to try, I personally find that it can sometimes give more empty feeling images, or more blank space. But it also seems to be useful for things such as figures, and some people swear by it. All of the following images you will see were done with VITL336, I would like to note that these are also not from official experiments but just runs I had done for fun where I varied settings, the seeds are not constant, but most other settings besides the changes in cuts if not all are held constant.

https://lh4.googleusercontent.com/rV2LeD_NU49__NSrZOG8oL1fT47w_mMXH6j3h_XoEM3yeCBibjCOzFduuCa_bjw8r7g8M_zwRb_YDN-6Gb2Dauami-Z7wedD9hKBBNoS1VOkWIw0pBnHO0GvZm385mDzhv-Id31orne3rvvqUg

This was done with 0 innercuts for the first 40% and still a nice result. (a bit of post processing to accentuate colors + lighting)

It’s a pretty neat image, i like it a lot :), but the background is also pretty quiet.

Here’s some other examples that also do 0 innercuts for 20-40% of the generation, I think you’ll notice a trend here.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46302814-14c6-4487-bf90-52e662cc8a30/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c67ddb9-1ae1-469b-a3d1-a1b476400b0b/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a59af42d-fd51-4d06-8907-6e910a36b83b/Untitled.png)

some landscapes/locations

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ffba5b71-c8a9-4d33-aa79-ba406499f5e2/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d419ed32-be07-44dc-bf9e-d41ee98926fe/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09f2783c-e2d8-4b6c-a7de-9a3f7e31770b/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/52f74fad-29bb-4b10-a848-c54cfddd4385/Untitled.png)

The figures seem to do pretty well, and perhaps the quieter background works to its advantage, but the landscapes + the medieval inn with the robots have issues with empty space, weird perspectives, and elements getting confused on whether they should be in the background/foreground.

I take it this is because those kind of images need that arrangement of smaller details right off the back.  From the get go, you need it to figure out where you want those robots will be in the tavern. **The idea of a “silhouette” isn’t as applicable for these kinds of images**

A few more comparisons with these:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7d77df98-2797-4a33-838c-52ac5c57999a/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5eb72a5b-fc8e-4ae5-8ec3-591b4f9f82fc/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0798918d-22a8-4fb6-9edd-469468a9b04a/Untitled.png)

Starting from top left, # of innercuts for first 20%: 0, 1, 2. I would definitely say the first is the least hectic, but also misses out on some of the cool details that pop up in others.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2754c282-a7d2-4473-ba4a-815b9f398a11/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8eec2212-3171-4978-8d4d-d6a94ef61c01/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a438235d-4fc6-4fec-a0e8-85c5d1e58b56/Untitled.png)

The first was done with 2 innercuts for first 20%, the other two were done with 1 innercuts for first 20%

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/54a272bd-bfb6-453a-8efd-51cbb1d40ea8/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b4c025d-dac1-44f5-af77-d2865d70c65c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8dfdda6-6c37-4273-a951-084f8a6deb13/Untitled.png)

Meanwhile all of these were done with 0 innercuts for the first 20%. It would be bad research to dismiss the element of randomness where some seeds just have better luck, but I also think this is one of those cases where specific detail, thus more innercuts early, is needed from the get-go to help differentiate between head and tail, etc.

*Update: 7/21/22: a study I did comparing cut pow against # of innercuts for first 20%*

[**https://drive.google.com/file/d/19ekqvNRDN1U-06CvlWH9P4L4M6u1Lln1/view?usp=sharing**](https://drive.google.com/file/d/19ekqvNRDN1U-06CvlWH9P4L4M6u1Lln1/view?usp=sharing)

low res version here.

![Screen Shot 2022-07-21 at 2.05.11 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0461150c-f343-4453-8130-de641592c58b/Screen_Shot_2022-07-21_at_2.05.11_PM.png)

### **Designing your own Cut Schedules, some pointers**

I often have to adjust the number of cuts cut schedule when fiddling with models or resolution to adjust to the memory requirements. 

The way I’ve gone about it is having a **set number of innercuts** across all sorts of runs, rather than a ratio between inner/overview. What I outlined here:

[2]*200+[4]*200+[12]*400+[12]*200

at least the first 40% is pretty constant. Although if i have some extra cuts to work with. I may stack some extra innercuts post 40%

[2]*200+[4]*200+[18]*400+[18]*200

You can also think about adding some extra arrays for a more gradual flow, although try not to switch too much, especially early on, and also this is may be unnecessarily complex.

[2]*200+[4]*100+[6]*100+[10]*200+[12]*200+[12]*200

Generally though, I keep these pretty consistent, and then whatever memory i have left will go into a tricked out overview schedule

***More is generally better, when done correctly.***

If you’ve got some extra memory to blow and don’t mind the increase in time. Stack some overview cuts in the beginning

on 24 cuts, maybe something like this:

**Overview:** [22]*200+[20]*200+[6]*200+[2]*400

**Innercut:** [2]*200+[4]*200+[12]*400+[12]*200

*I drop off the overview cuts pretty quickly after 40%, they’re pretty pointless after 50%, but ill keep a few for the peace of mind, and often drop them to 0 for last 20%*

With the extra overview cuts, you will likely notice some improvement in structure. Here’s a study I did a long while ago before i really had a good understanding of how cuts work. I’ve since lost the settings but it was base models, default settings except that CGS was probably at 15k and cut_pow at 10

Essentially I ran 

1 at default cuts, **(a)**

**Overview:** [12]*400+[4]*600

**Innercut:** [4]*400+[12]*600

1 with innercuts doubled **(b)**

**Overview:** [12]*400+[4]*600

**Innercut:** [8]*400+[24]*600

1 with overview cuts doubled **(c)**

**Overview:** [24]*400+[8]*600

**Innercut:** [4]*400+[12]*600

1 with all cuts doubled **(d)**

**Overview:** [24]*400+[8]*600

**Innercut:** [8]*400+[24]*600

A

![1o1i (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3fbc2d4f-66f3-4596-a9a0-93b1e6fd7c53/1o1i_(1).png)

B

![1o2i (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c615b718-115c-4d6b-a205-ef22aa69b670/1o2i_(1).png)

C

![2o1i (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6b879cc-6aee-45e5-bfb7-b0b30e4086f7/2o1i_(1).png)

D

![2o2i (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/05701979-37c2-49d7-9846-0e63bccf3016/2o2i_(1).png)

**A without a doubt was the closest thing to a dragon I got**

Here’s a study done by KyrickYoung that shows the importance of having good cuts and not just more cuts, as well as how things can get weird with high cut pow in tandem with many innercuts [**https://twitter.com/KyrickYoung/status/1502119135446245386**](https://twitter.com/KyrickYoung/status/1502119135446245386)

![FNiYk_lXMAMNkFy.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4ec193d6-4d6d-4b2f-a296-5f0f7605f8b7/FNiYk_lXMAMNkFy.jpeg)

![FNiYk_mXwBoBpcm.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5bb329c2-4580-4d87-9a14-f199010b49b5/FNiYk_mXwBoBpcm.jpeg)

*note: cut_ic_pow max value is 100, placing it at 1000 will just route it back to 100. It’s especially evident in the similarity between the 100 and the 1000 runs.*

Another Cut_scheduling study by KyrickYoung that really outlined the way I think of cuts and helped me get a start from there. 

[**https://twitter.com/KyrickYoung/status/1501729296376860674**](https://twitter.com/KyrickYoung/status/1501729296376860674)

![FNc20vAXsAM2A93 (1).jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b8fa84e-a97d-4bd6-aba3-fe09fc4997b3/FNc20vAXsAM2A93_(1).jpeg)

Here, you would be lead to believe that the top right corner and the one below it may be the best combinations. We’ve got a solid coherent landscape and some really convincing buildings. 

![FNc20wQWQAEoZ16.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1e510b0a-0bda-4b2e-be2c-ee233ec2c6b7/FNc20wQWQAEoZ16.jpeg)

![FNc20v0XsAAFHR1.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6aa8e801-7b14-4073-9ab3-cba64d23e7e7/FNc20v0XsAAFHR1.jpeg)

However on these outputs, things fell apart a bit more. Perhaps the improvement we saw in the first was a matter of there being more cuts in general along with accepting an unusual building shape as being part of the artists style and that landscapes are in general “easier to fudge”, especially noting that this was done at cut_ic_pow 1 so the innercuts can range in size almost up to the size of overview cuts. I’d like to see this done again with default innercut schedule and reallocating the extra cuts to overviews.

This is a section I feel less confident in with what I’ve found, but there definitely seems to be some patterns. A solid same seed cut study beyond these with other combinations is something I’m meaning to do as well so I can really try and establish something

## Some good baseline settings, Favorites of many

To wrap up all this talk on settings, I figure I should offer some setting combinations that are tried and true. These will fit within Colab and offer incredible bang for buck. And they’re also a good place to start when testing individual parameters to change from there.

*any parameters not mentioned generally are not super impactful, or may not work at all, feel free to play with these however you’d like.*

**With Secondary_model**

- **resolution: > 512x832 preferably, otherwise it’s quite flexible with resolution**
    - higher than 1280x960 may have diminishing returns, plateau in quality
- **cutn batches: 2-4,** if willing to spend more time: 2-8
- **Steps: 250, 333, 500.** 250 is much more at risk of overexposure issues
- **CLIP Models**
    - **ViT32b - reccomended**
    - **ViT16b - reccomended**
    - **ViT14L - reccomended**
    - **RN50 - reccomended**
    - RN101 - optional switch for rn50
    - **RN50x4 - reccomended**
    - RN50x16 - if memory permits
- **Clip Guidance Scale - ~15-25k**
- **Eta: 0.7-1.0**
- **Clamp_Max**: **0.05-0.1** *dependent on steps/prompt to avoid overexposure*
- **Cut_ic_pow: 5-15**

**Without Secondary_model (certain values will be more specific as this config runs near maximum memory usage of most colab GPUs)**

- **resolution: 512x768**
- **cutn batches: 2-4,** if willing to spend more time: 2-8
- **Steps:** 100, 125, 166, **200, 250**
- **CLIP Models**
    - **ViT32b - reccomended**
    - **ViT16b - reccomended**
    - **ViT14L - reccomended**
    - **RN50 - reccomended**
    - RN101 - optional switch for rn50
    - **RN50x4 - reccomended**
    - RN50x16 - if memory permits
- **Clip Guidance Scale - ~10k-25k**
- **Eta: 0.7-1.0**
- **Clamp_Max**: **0.1-0.2** *dependent on steps*
- **Cut_ic_pow: 20,** (5-50)
- **Sat_scale 10k-50k**
- **Tv_scale 10k-50k**
- **Range_scale 10k-50k**

## Prompt Gallery/Inspiration Zone (**UNDER CONSTRUCTION)**

Thought I’d share some of my old runs as well as the prompts so you can try to remix them, grab some artist styles, etc.

To start, I also have all the prompts from my [**model study here.](https://drive.google.com/drive/folders/1zL5cIf3mbz3jLkikbUHDvmmGmx2S2MrY?usp=sharing)** See the prompts document and then you can access the folder for the results.

## Troubleshooting

### Blank Images, primarily without secondary model

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/979a9b5a-87aa-4441-a66e-4251c8c9e673/Untitled.png)

When I first started running with the primary model, a good 4/10 or so renders I got looked like this, or honestly often even more blank than what we see here. Pretty frustrating to put 250 steps of what should be adding all this nice detail into creating something entirely blank

I still occasionally get stuff like this but much much less often, it seems to be very **dependent on prompt,** I would say that my prompts that deviated from my normal protocol or tried some weirdly ambitious ideas were more prone to this. But prompt definitely doesn’t entirely explain what’s going on here.

I’d say the other notable culprit would be something with to do with your cuts. For whatever reason, while cut pow 1 works just fine on the secondary model, it seems to be prone to blankness when running Primary model. Hope to add an experiment for this  to really show, but over lots of failed runs that seemed to be a common denominator.

I also find a schedule favoring lower innercuts early on seems to help as well. At least for the first 20% i.e.

- [0]*200+[x]*200+[y]*200+[z]*400
- [1]*200+[x]*200+[y]*200+[z]*400
- [2]*200+[x]*200+[y]*200+[z]*400

XYZ being whatever you deem fit for your Resolution, models, cut pow, desired vibe, etc. Although I would say generally always in an increasing fashion makes the most sense.

Also, not fully sure on this one, but having some **skip steps** seems to help, especially if you have a **perlin init** enabled, shoot for ~4% skip to start.

*These are not strict ways to go about this, you can keep the same for 30%, more, whatever floats your boat*

### **Black Images, Solid color images.**

I have no exact answer to what causes these. But I do know if you run with secondary off, and have experimented with higher clamp_max values, you’ve probably run into this a few times. It does seem to be **more frequent with higher clamp_max** values, but for me, has still been infrequent enough that I wouldn’t let it stop me from experimenting with all kinds of values. Nevertheless, pretty frustrating to see it continuously work on a blank image. It generally tends to happen early, 15-25% range or so.

Here’s some of the signs that it may happen.

While rendering, a progress image comes out with this rough poster-like texture, and seems much more erratic than the previous display. (I have it update every 10 steps, or every 4% of the run, to help gauge the amount of time it can take)

![Screen Shot 2022-07-01 at 4.05.25 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c1b7153e-6398-4280-9939-9a5864784991/Screen_Shot_2022-07-01_at_4.05.25_AM.png)

and boom, just like that 8 steps later.

![Screen Shot 2022-07-01 at 4.05.52 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3f16fb22-20aa-4015-b5fa-f4e32dedc69b/Screen_Shot_2022-07-01_at_4.05.52_AM.png)

Should you let it run to the end, your loss chart will look something like this:

![Screen Shot 2022-06-30 at 12.55.26 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02285ab5-5f26-4e0e-9683-ed0ed6c67657/Screen_Shot_2022-06-30_at_12.55.26_AM.png)

*Update: caught another example, moments before disaster*

![Screen Shot 2022-07-10 at 6.52.51 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c1cade1-592a-4627-8209-b29505f034af/Screen_Shot_2022-07-10_at_6.52.51_PM.png)

### **How to prevent Motifs, broken images, stitching.**

***All generally have the same culprits***

**Motifs -** motifs are when you get multiple copies of your subject, typically mini smaller versions. Sometimes you’ll have mini landscape scattered around a landscape, or often when trying to get a character, they may have more than one face scattered around their body. Because of the nature of CLIP-guided diffusion, this isn’t fully avoidable always, but there’s a few things that could be making it worse

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc65a72d-ad6f-4816-a6c5-26282b9fc86b/Untitled.png)

Notice that we have our main samurai fella but then also a bunch of other mini ones scattered everywhere, often in nonsensical places.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a03829d9-92a7-4178-ac6a-1827f376c1ad/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c1cf5f0-0c71-448c-8429-e492c697aa91/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b971ab5e-c4eb-46e4-a21a-8d5106176287/Untitled.png)

Here’s what we call a **double horizon**, generally caused by same things that can cause motifs, but additionally, seems to be likely to happen when using a **vertically dominant aspect ratio,** especially when doing landscape scenes. Also some definite motifs going on here.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8743e77a-4406-4b41-9728-8db447966549/Untitled.png)

This is sort of what I refer to as **broken/stitching**, notice how there’s random faded elements all over the place without much rhyme or reason. And objects that somehow look like they’re both in the background and foreground at the same time.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a7ff1a1-cd5e-4b0a-9303-0648276bc3ba/Untitled.png)

Also, don’t have a great name for this one, but sometimes y**ou’ll have things that look like two different objects at the same time.** Here we’ve got some guys here that are simultaneously characters wearing armor but also look like buildings. That kind of funky ambiguity is an iconic clip-guided diffusion trademark.

Although I’ve got a bunch of different names for these things, you’ll notice they all manifest pretty similarly, but lucky for us, the culprit and fix tends to be the same thing for all of these issues.

1. **Too high of a Clip_guidance_scale**

CGS is described as how much the image should look like your prompt, so more is better right? Why not crank that all the way up? Cool as it sounds, it’s a little more complex than that. Let’s say we’ve got a nice picture of a sunset, but now we want to make it look like **even more** of a sunset to satisfy a higher clip guidance scale. So what can the image generation do to make a sunset look more like a sunset? Start adding more of them everywhere. Also with these motifs, it will often try to start building stuff around it, which is how you’ll get stitching and broken images

1. **Too High Cut_ic_pow:** As stated before, higher cut pow/smaller cutouts does increase the strength and speed of denoising, which is how it is able to achieve finer details. Overdoing it can bring out detail where there is not necessarily meant to be any. [**KyrickYoung Study on cutpow**](https://twitter.com/KyrickYoung/status/1501771536876945409)
2. **Faulty innercut scheduling (usually in combination with increased cut pow)**
    1. **Too many innercuts early on.** Especially visible in [**KyrickYoung’s study.**](https://twitter.com/KyrickYoung/status/1502119135446245386/photo/3) Notice that even at 1 cut pow, [8] innercuts starting from the beginning we see a lot of fragmentation and repeated subjects. Also a similar issue to what causes blankness, so can use examples there.
    2. **Switching # of innercuts too early on, or too frequently during early parts of run** don’t have as much confidence in this claim but seems to be an issue for me. In fact I would say changing a lot of other variables I have scheduled in this early unstable zone seems to cause issues. For cuts though, I imagine that each sort of combination of cuts looks at the noise differently right? So I suspect that it may be on one path or idea, and then changing it may throw it off the path that it was on and sort of confuse it? And later on in the run, the image is stable enough that it shouldn’t be as subject to different interpretations. Note that this is all conjecture based on poor results when trying to have too many arrays in my schedule.

 3. **Higher Resolutions:** Resolution and cuts go hand and hand. Higher resolutions can be more difficult because 1. we are asking a 512x512 model to expand its canvas to expoonetially greater sizes, and 2. because the size of the cuts generally trend towards 224x224, if you have increased your cut pow beyond one, this is generally a good way to get more detail in your image, but it can also make it difficult to cover the entire canvas. I talk more about this in cut scheduling and resolution.

And lastly, **Seed!**

1. Sometimes you simply just get a seed that doesn’t do so well, just run it back!

## What Same Seed Really Does

Sort of a little “secret” I noticed when flipping through images on my computer. I would have never noticed it just looking at two separate images, but when overlaid over each other there’s constant points that don’t seem to change across separate prompts. Check out the videos I made on this a while back. Any words I can string together won’t do justice so I suggest you check out these videos :)

[**https://www.youtube.com/watch?v=5H1SVUEmZuU&lc=UgwEB31QnMbPKbqe0l54AaABAg&ab_channel=EthanSmith**](https://www.youtube.com/watch?v=5H1SVUEmZuU&lc=UgwEB31QnMbPKbqe0l54AaABAg&ab_channel=EthanSmith)

[**https://www.youtube.com/watch?v=LXIX9nnLwh0&t=4s**](https://www.youtube.com/watch?v=LXIX9nnLwh0&t=4s)

For those who have played Minecraft, the way I like to think of it:

Using a certain seed when creating a world will always give you the same world and same spawn point, but each player (and in our case with AI: differing prompts) will manipulate the world in a different way. The foundation is the same, but the end result will be different. 

## **Animation**

As of now, I am yet to ever make an animation, so can’t speak at all on it except for limited  knowledge about a few parameters. I haven’t been super interested in it because of the amount of time it takes as well as some of the choppiness between frames. That said I’ve seen some people make some incredible animations and there have been many improvements in the workflow by adding functions like Warp (optical mapping done by Sxela) or Turbo (speeds up generation, done by Zippy). For now, I offer you this video on the basics [**https://www.youtube.com/watch?v=afkpifMPOGA**](https://www.youtube.com/watch?v=afkpifMPOGA)

If anyone wants to help me with this section and has good knowledge on it, reach out to me!

## **Big Boy Models (VITL14_336 & RN50x64)**

Both of these are models trained on on large sized cutouts and additionally are very computationally heavy. To compare VITL14_336 to VITL14, it is trained on cutouts with 2.25x the number of total pixels. ViTL14_336 also uses roughly that much more memory opposed to its regular counterpart.

Both of these score quite high on what is known as CLIP scores, which is just a metric of performance.

They are also capable of getting some incredible detail, and can capture some complex prompts quite well. For that reason, I advise using a higher Tv_scale (assuming you are running with secondary off)

[**https://discord.com/channels/944025072648216586/982029144495882300**](https://discord.com/channels/944025072648216586/982029144495882300)

Here’s a link to a thread I made on a ton of comparisons between VITL14_336 to RN50x64. VITL14_336 generally takes the cake, but it does sometimes dull color a bit and has a tendency to try to make things more 3D. RN50x64 does a pretty cool job for cartoony style stuff though. I typically tend towards VITL14_336 though, it is also significantly less memory intensive.

At the same resolution,

With RN50x64 + VIT32,16, normal VITL14 + rn101 + rn50x4: i was able to get 13 cuts

With VITL14_336 + VIT32,16 + rn101 + rn50x16: I was getting 18 cuts

The difference in models between the two of RN50x16 in one and VITL14 should be roughly offset as they consume a similar amount of memory.

Here’s a guide to VITL14 vs VITL_336 all other settings held constant (not done yet)

When it comes to budgeting your memory, you’ll likely have to reduce cuts to make room for the bigger models. So which path do we take? High cuts on the smaller models, or lower cuts on the bigger models?

I’ve seen some exceptional work come out of even simple model sets (with secondary off) like

- VITL14, VITb32, VITb16, and rn50x4 (a favorite on the discord)
- Or even just ViTb32, VITb16, and RN50

While stacking a bunch of cuts in your cut scheduling

Many believe this is the better way to go for most cases and I’m looking a bit more into that as to what are the pros and cons of each.

From what I gather so far, a good amount of cuts in a healthy schedule will do wonders for a **coherent structure and offer some good detail through the innercuts**. So the smaller model route is quite viable for that.

The pros of the big models seem to be via an **accuracy boost.** I’ve been able to capture some really complex prompts that flopped when trying with smaller models and the CLIP score measurements support that. They may not be able to match the coherency as well as the other use case, but still do pretty well in my opinion. Additionally, they are more intrinsically detailed, so they are still quite competitive there.

However, I think there may be different optimal cut pow’s for whether you’re running with 336x336 models or not due to how they handle cuts. Generally, the bigger models do just fine on lower cut pow.

**TLDR opinion piece:** 

**regular models with memory spent on more cuts for reliable COHERENCY,** 

**Beefy models while sacrificing some cuts for COMPLEXITY.**

In regards to the accuracy boost. Here’s a couple of them . Unfortunately, I don’t have all the comparisons as quite a few runs were halted, but even after many reruns and attempts it just couldn’t get it.

## Doing your own experiments

I encourage you to do your own experiments as well! Just because its on this guide doesn’t mean it is the end all be all. There is so much this guide will not be able to reach just because how much there is to play with, and ultimately a lot of it is subjective, so you might like something entirely different from the suggestions I make. Either way, I say a big part of the thrill of AI is in its mystery and making slow but sure progress with each discovery.

You can freestyle a bit and just try to adjust all sorts of things, but if you want good results to draw a conclusion from, here’s some pointers

- Use the same seed
- Adjust one parameter at a time
- Try running the entire experiment on 2-3 different seeds, just to make sure the perceived differences might be specific to that seed.
- Try the experiments on prompts with different contexts: *figures, landscapes, etc.* this is to make sure your conclusions can be applied out. Some setting adjustment might look real nice for a landscape but might decimate a figure and you wouldn’t want to falsely conclude it makes things better across the board. Even consider trying some more abstract or ambitious things to see how each setting arrangement interprets a prompt. In my model study, it was interesting to see how each combination of models decided how to depict “the printer of the universe” some depicting large compounds with people while others without.
    - Also personal note, I’m not such a fan of doing experiments on landscapes without any defining subject as I feel it’s pretty difficult to tell the difference in results. Landscapes are easier to fudge, if a rock is out of place, no ones gonna bat an eye, if an eye is out of place on a person, that’s a big deal. Also lurk around [**Kyrickyoung’s thread](https://twitter.com/KyrickYoung/status/1501771536876945409)** on Disco experiments, you’ll find that there’s much less variance in outputs with the Thomas Kinkade house painting when compared to the other examples

Also, some things can’t be tested 1:1 by making use of the same seed due to the way how noise is seen/manipulated.

- Cutn batches
- Resolution
- Perlin init w/ skip steps
    - May be wrong on this one, but as far as I know, perlin inits are just like inits, I am unsure if the specific perlin layout is determined by the seed though.
- Noise sampling methods

Consider trying the parameter exploration notebook which makes it easy to set up experiments with its ability to automatically run loops while adjusting parameters and puts all your images in a nice grid for comparison at the end.

[**made by Enzymezoo**](https://colab.research.google.com/drive/1wpHI6epariBlnGjGfVR7c--rjUYVY_9l?usp=sharing)

And here’s an example of what the outputs will look like, if you’ve checked out the earlier experiments in this notebook, they’re in this format.

- **[KyrickYoung](https://twitter.com/KyrickYoung/status/1500196899827167238)**

## Advice for how to capture a specific kind of subject

In my honest opinion, most of that will come down to prompt. For the most part, most settings or models don’t work in the kind of way where they’re strong for one kind of subject but weak and another. There are definitely pros and cons in style and detail to each setting, as I’ve discussed earlier but I wouldn’t say something like, “use rn50 for landscapes and rn101 for people”

That said, the two settings I think may be worth messing with for varying what you are trying to capture may lie in your **cut settings and clip guidance scale.**

For Clip Guidance Scale, lower values will have less repetition and will give overall cleaner images. This is definitely useful when trying to avoid distortion in trying to get a normal-looking anatomically correct figure.

https://lh3.googleusercontent.com/rljzrzN2-od8Ixa53YVVDNFFsiZC56DcLMiJMumC_QI7W-xWhWrxrx9r40JwmbGndSAXRQoc7PDCpHbetTLxeZK-gHXDzd70vzC_T2_U7qccsf9Qn7iPWVzBkz7DH7gIuedhAki14JKmmd-zCQ

https://lh5.googleusercontent.com/SHddCPmaqTscdMPoGKGkYJV127s2zlcRzsC4KmdpnFi6YBtohKEnW9eB7PHAJ_G36pwuYJQtLt9KtJ_9B4Avmjtn0lXO9nDWIRXLS2lZq7km1URI3o9iRFWwbONDmUas83_Lt2cpZpROj4WysQ

Both of these were done on only 5k guidance scale. Thank you to Virtualbri (left) and Annetropy for these incredible examples (right)

Left was done with an init image of a silhouette, but only at 10% skip steps, so still seriously impressive in my eyes.

https://lh6.googleusercontent.com/16jnhOjCTpl21zKq11PB1as9YRg0QzoIGMMJSWVAP2MERCOVxvd3fXDtGY-Eyu8OI8TA7EXXHIPr94xSc6zt2ozUa_nP7yHkA4d15SrxgWD4VYnC2d8i6TheOKI0IbtDOAukPzarUxU8OS1jug

Meanwhile, this was an attempt at a jojo stand I did at 13k clip_guidance_scale. While also a bit more complex of an idea to capture, we’ve got multiple subjects forming all over the place, with mini heads and eyes everywhere.

For Landscapes and Abstract things, You have much more allowance for Clip_guidance_scale as there’s much more flexibility in the depictions/compositions of these things, and many like the extra detail it can bring out.

**Cuts**

I talk about this much more extensively in the section on cuts, so i’ll just link to that.

## Advanced Prompting/ Prompt Troubleshooting

**Prompt Weights**

So I actually understood these incorrectly until recently when Aztec_man had explained them to me. I was under the impression that they worked similarly to a recipe or a solution. 5 parts water, 3 parts vegetable oil, 2 parts sugar. Our not so edible concoction would be 20% sugar without any debate. Likewise, with 1 part prompt x and 1 part prompt y, I thought that there would be 50% influence on t he final image by each, resulting in a “visual average” between the two ideas, but it turns out there’s a bit more nuance to it.

It seems more that the loss mediated by Clip_guidance_scale is split among your prompts according to your weights. And as I’ve mentioned with loss scales, they tend to be a gentle push in a direction rather than a hard limit, or absolute. Also, it will depend on the individual influence of the phrases and “intraweighting” of tokens within each prompt. So it seems to be much more flexible than I thought it was. Dilution can still be an issue, especially if some prompts are much greater weights than others. Either way, I generally only use 1 prompt and it’s worked just fine for me, but others have had great luck with weighted prompts. I really think there’s an art to each method. A right way and a wrong way to go about it. Nevertheless, this is something I’m hoping to do an experiment on, but still thinking on how to do it in a way that will give me usable results.

Here’s an example I did with VQGAN + CLIP, an earlier form of AI image generation. I’m inclined to say weights work similarly as I imagine CLIP handles both of that, which is a constant between both programs. However, I’m not certain enough to make that claim.

https://lh5.googleusercontent.com/Q4exYlweEeRiZi5l_zFh-NQKwhYSLRz6D9Qx_jeDZxnGAN6Zs89-PRbp2uHufDu90bowH_k7EBj3GaEufS_cpeFkEI7Jyp1lwc22uVizBWEkJFG9Cs20ssgZE7t8y6ZhEjSxYrAp9Fm6hnUPuA

On the left we have “an astronaut, starry night”, on the right we have “an astronaut”,”starry night” split 50/50. The first is robustly similar to starry night whereas with the second you have a lot of the cool colors, the waviness of brush strokes, and the yellow stars of starry night, but it definitely stays away from the painting we know.

![VITL336 (no 2nd)(937)_0.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b247043b-b01b-4d03-bcc0-8137c0f464f9/VITL336_(no_2nd)(937)_0.png)

![VITL336 (no 2nd)(938)_0.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/34729d3b-9da4-4a04-993b-7ce3fe7858f1/VITL336_(no_2nd)(938)_0.png)

Here’s the same experiment done with disco diffusion. Really pretty similar. Me and some fellas are still debating how this thing is calculated/registered so will try to follow up with some more tests.

To use weighted prompts in Disco, you have to separate them in this fashion [“prompt1”, ”prompt2”] They have to be within the same brackets however, and each must have their own set of quotes.

When you use multiple prompts, by default, each one will have a weight of 1. So using two prompts, each one will have 50% influence over the final output. 3 prompts, each gets 33% influence.

You can also manually set weights as well as such- [“idea x:4”, ”idea y:2”, “idea z:1”]

The colon with the number (:4) must be at the end of the prompt and within the quotes just as shown.

Also to note, it all gets divided by the sum of the weights at the end anyway. So if you’re using one prompt by itself and putting “cool prompt:1000” that will be the same as just “cool prompt”

People have had pretty solid luck putting a subject in one prompt and styles in the others. This is a pretty solid idea as you can choose how much influence you want each style to have over the final output, especially as some styles can be pretty overwhelming.

An example I have seen that does not work so well is listing different elements or subjects or backgrounds you want in each prompt. It probably won’t incorporate each element you specify in a neat fashion, and it’s possible you might get a subject that is a hybrid of the two things. You’re likely better off putting “a man riding on top of a cloud in the sky” than “a man riding on top of a cloud:1”,”in the sky:1”

Another point where I’m asking, correct me if I’m wrong, but a prompt is evaluated in such a way where it will have a quantifiable value for some 500+ visual traits (may be dependent on the amount of parameters in training) each an axis with negative and positive values. This [vox video](https://www.youtube.com/watch?v=SVcsDDABEkM) does a good ELI5 explanation of this towards the end of the video. So now our prompt encodes for a point in some 500+ dimensional space with each coordinate being an important bit of data. This is a lot to process for a machine, so to compress that data, it is made into a **latent space** where coordinates in 2 or 3 dimensions, but directions in latent space are somewhat meaningless. I.e moving upward continuously (if we can even call it upward) may not linearly increase “redness” if that’s a trait we’re looking at.

Rather the important variable is distance between points, points that are closer are more similar visually while points that are farther are more different

Here’s a [**tool you can play with](https://n8python.github.io/mnistLatentSpace/)** that helps visualize the latent space.

And a [**great article**](https://hackernoon.com/latent-space-visualization-deep-learning-bits-2-bd09a46920df) on it

The most common uses I see of prompt weighting is to either

**1. Use the other prompts for modifiers.** This one I imagine you can get away with more, but inevitably it will likely be taking away from your subjects composition, form, etc. Something like “a beautiful house in a field:2”,”by james jean and Thomas Kinkade:1” On one hand, this may be able to help you get a clearer subject. You have one prompt that exclusively captures a subject and gives it adequate weight. But on the other hand, I am unsure about dilution and lack a super great understanding of how weights can skew a generation, especially when a style is specified without an object/medium

Something to consider trying might be “a beautiful house in a field:2”,”art by james jean and Thomas Kinkade:1” If there’s any loss in form of your main subject through dilution, it will be exchanged to appear even more like an art piece by one of them, so it could definitely be interesting. But also don’t be afraid to have long prompts! Sometimes it just makes more sense to do “a beautiful house in a field, by james jean and Thomas Kinkade” I’m often hitting the token limit on all of mine which I believe is 77 words.

**2. Put different subjects in different prompts,** which is arguably more likely to cause problems as if you put “a house” and “by the ocean”. CLIP is somewhat adept at recognizing the relation between ideas within a prompt. In this case, the relation between these two ideas is now split from each other, so more likely than not, it's not going to be a house with a nice view of the ocean in the background, but instead some kind of misodering of where the house and ocean should be in the image. The house might be in the sky, or maybe the ocean will take the foreground while the house takes the background, or in extreme cases, a house made of oceanic textures or something like that. Not fully certain on this, but that’s sort of how I see it.

https://lh6.googleusercontent.com/CXYo8xozcX0XKkEidMztnOG1_7Uh0cSom8dOviGmLM4ZoWMeyF6wdnCp7Dw891Ydbgq0B9Kt25tj1j8LQfu9ySQxlP6QxE_uqQVwsp5mLBQ26B0B-alA34xR5UTMoF_HfS6N3vU_kaU2l48UoA

I’ve seen it happen a bunch but this is an example of one of those hybrid outputs. I kinda like it! If you want to get really experimental, it could be a great way to get some abstract stuff! Ever wondered what the hybrid of a cat and a dog is? Go for it.

I rarely if ever use multiple prompts, and when I do, it’s usually something like “art by x,y,z” example, mostly because I'm over the character limit, but also it leverages the artstyle to almost have permission to overtake your subject a bit? I think? If that makes sense.

Something else to try is **reiterate the subject** “a beautiful house painted by Thomas Kinkade:1”, “a beautiful house rendered in unreal engine:1” Notice the overlapping subjects to prevent dilution of subject and easy superposition of these two prompts. Some styles can be really overwhelming, namely unreal engine’s, so this is a nice way to finetune that.

Or another example

“Super long prompt about this jojo character i want with this style and power and this artist”,”a jojo character designed by (manga artist) (with modifiers x,y,z):1”

I do this because I think all the powers, art styles, etc. I mentioned in the first one is a lot to cover and it might all get distorted. So the second one, more simple, gives it something to ground itself on, and they’re similar enough and both stylized that it shouldn’t conflict too much.

I hate to be anecdotal, and let the findings do the talking, but that’s something where I really don’t have enough of an understanding of CLIPs interpretation of prompts, and the limited experiments I’ve done and the understanding I have of how it works is in line with it.

Here’s an explanation by @Coar on the discord server that reiterates all of that, he also has some super neat examples showing the differences between same/different prompt

[https://coar.notion.site/coar/Coar-s-Disco-Diffusion-Guide-3d86d652c15d4ca986325e808bde06aa](https://www.notion.so/3d86d652c15d4ca986325e808bde06aa?pvs=21)

https://lh5.googleusercontent.com/sYsR6mD4XA2-8MtgL0vxHCQMIt8SPeVEw0ZPTz42iTa-kYu7dWSSeUqg-5DVc-wwwCYwdpNeGEFAQxr0Ivp8kutGtO2uABk5kJhytrWCA2AgWPK7KneTK59_WjgGq_e8_H3frZHnEZLPWDKQow

Syntax B utilizes ideas and modifiers expressed in separate prompts whereas Syntax A does it all in one prompt.

**Negative Prompts:**

Another awesome trick! If you are frequently getting something you don’t like in your final output, a good thing to try is a negative prompt along with your main prompt. So let’s say that lighthouse prompt is giving you too much blur. Let’s try:

[“a beautiful lighthouse by the sea, trending on artstation:2”, “blurry, depth of field:-1”]

In theory it will guide the generation away from those elements. Wanna note that this will not cause the same dilution issue with typical multiprompting, this is as rather than having two ideas competing for their presence in the image, you are removing an idea from the image. I am a bit skeptical as to whether it might affect composition in other forms that way, but that’s for another experiment. Something to note though, you cannot have the total add up to 0, it will crash. Remember how I said that everything gets divided by the sum of the weights at the end? Well, there you’d be dividing by 0 and the program will crash. Same thing if your total ends up being a negative number. So don’t do this

**[“a beautiful lighthouse by the sea, trending on artstation:2”, “blurry, depth of field:-2”]**

Unless you’re on a journey to find every possible error message

Or this

**[“a beautiful lighthouse by the sea, trending on artstation:1”, “blurry, depth of field:-2”]**

Which is a ticket to AI limbo

Here’s the kind of stuff you’ll get from this flavor of AI limbo

![nature_intertwined_0_6.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9dceefe5-afcd-4f3c-99e8-d9be6d61c730/nature_intertwined_0_6.png)

![asdofasdf.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0069198d-a7a1-4564-ba27-e34a833fd94e/asdofasdf.png)

**While these do work quite effectively to remove an unwanted element, I am skeptical as to whether it may affect your composition in other unintended ways. It’s not so simple to just lock onto a single element and remove it, every prompt word affects the image on a “global” level, meaning the entire image. Just a forewarning to some of the mystery that surrounds it**

And something to note as I see this a lot.

**[“a beautiful lighthouse by the sea, trending on artstation:10”, “blurry:-1”, Depth of field:-1”,]**

There’s two problems with this, or really two that are one in the same. Here your negative modifiers are only subtracting 1/10 from your prompt, so assuming that your main prompt is what is causing the blur, which aside from some settings etc being an issue, it is the culprit, you’d only be removing a small % of that blur. For that reason I believe it’s best to put all your negatives in one and give it a value that is competitive with your main.

Also, according to the CLIP retrieval, “Blurry” references blurry pictures whereas “blur” sometimes references the band and things that aren’t what you’re probably trying to eradicate when wanting to remove blur.

Many people also use “dof:-1” instead of depth of field, I think that might work? But also DOF is the department of finance, and I imagine there’s some other ambiguity there, so I would personally go down the “depth of field:-1” route as clarity is just the rule of thumb I go by.

What negative prompts you will want is fully specific to your use case, so for that example I was talking about where that guy wanted the country: Turkey? I imagine you could put “animals, birds:-1” to help with that. That said, I rarely use them.

But some go to’s are

**“depth of field”**

**“blurry”**

**“.jpeg artifacts”** (this is a form of iconic low quality caused by jpeg compression, and with a very defined look to stray away from I imagine this one could be useful)

**“Disfigured, distorted”** I’ve personally never tried this, but curious if there’s some way you could get a better looking person by telling it what bad looking anatomy is.

**“Disproportionate, dismembered” -** also never tested… weirder words, let me know if they help?

**Other Tips**

Again, using things with consistent looks is always a good move

**“Portrait” will do wonders for faces** because of how consistent they are, try a google search to see for yourself.

But beyond that you can take it a step further. It’s pretty common that faces might still end up a bit lopsided or uneven or maybe one eye will be closed with the other open

I think a good solution to this is to **add some sort of modifier that expresses what kind of face:** Angry, Sad, Happy, or maybe you could even try something like “attractive” as that does have a look to it.

When you leave it at portrait, you do have the composition in check, but as there’s no specification on what that face is showing, it’s still left up in the air and is one of those things where you might get several interpretations showing up at once.

Haven’t tested this extensively but that’s just my thoughts

Another super popular keyword is **Tarot Card**. Prompts with “tarot card” in them often seem to give really rich complete looks.

I imagine there’s several reasons for this. Tarot cards are a complete image, you really won’t have to worry about a blank background around your subject as real life tarot cards all generally have lots of detail covering every inch of the card.

Additionally, they generally have a defined subject, centered in the frame. keep in mind that you don’t necessarily have to put a subject or artist that has the drawn, cartoony look of most tarot cards. Here’s some examples of my favorite outputs with it:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4a90150-c7fb-4af3-9825-8fcff0a84dad/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c5c1a0e9-90c1-4feb-9fb7-c6cd373b1ca6/Untitled.png)

Also, read up on camera terms, stuff like: wide shot, long shot, 35mm lens photography, all point towards a certain composition and are all super useful. Although I question if it might make your image more realistic because of the types of images you’d be pulling from, you might not want “elder god of hell, school picture” but you know just since I wrote that i'm going to try it now.

The **Best** thing you can do, and how I’ve come so far in my prompt game, is to look at other images and try to identify elements of what’s in the picture. I first tried to recreate a M.C. Escher work by simply putting: by M.C. Escher, that was far from enough. What kind of elements do you see in here? Better yet, how can we describe what’s going on here with words that have a very recognizable, defined look that can be picked up by CLIP?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2ecb7386-a3ae-4689-a855-aea8c490e081/Untitled.png)

Hard to put these kinds of things into words, but there’s quite a few words that denote composition here that might help us, for example **“aerial photography”** has a pretty defined look if you google it. **“Repeating patterns”** maybe we could say **“Contrasting Patterns”** as well. **“Black and white”**, there also seems to be a bit of a **“vanishing point”** and very clear use of **“symmetrical composition”** and the medium is **“pencil art”** the rest arguably is quite difficult to put into words. Now in my opinion the point of this technology is to take advantage of that beautiful zero shot capability we’ve been working towards for years that allows us to make things that have never existed or have anything like it appearing in the dataset. However, I think this is good practice for identifying traits of an image associated with a consistent depiction that have enough of a pattern for an AI to learn. Here was my attempt at that.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee2f5576-affe-4ea4-bbe0-e68e6a3f79a7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b20d9be8-358c-40c3-a20b-2e8cecfdbf1b/Untitled.png)

These were a while ago, and I think I only tried some half the words I listed up there, so probably could be done better, but it was fun.

Point is, If you have a vision in mind, try to really pick out all the specific details you want.

<aside>
💡 **Tip!** Although I have not tested to confirm this by any means. I believe it helps to use synonyms of words that evoke strong imagery, or have a niche artistic use.

</aside>

For example, take **“big”**

“big” is used to describe just about anything that is relatively large in size.

Now take **“colossal”**

probably puts a different image in your head right?

this is a word that is typically reserved for the epic, larger than life, and we can images captioned “colossal” are more likely to be fantastical, supernatural, or showcasing art from works of fiction.

> There are many of what I call “reserved words,” meaning words that we generally don’t use very often, except for a few specific cases. This is something we can use to our advantage, by being more specific with what we intend to capture without being verbose.
> 

some other words I can think of 

**“eldritch”, “celestial”, “ethereal”, “supernatural”, “epic”** (this one’s a bit more iffy), **“mystical”**

all of these will very likely reference images of some pretty mind-blowing phenomena, but still also carry a theme.

*it’s sort of a 2-for-1 deal.*

words like “painting” or “art” carry an aesthetic with no object

then general subjects, “portrait of a man” give us an object, but without so much personality

or suppose we want a character with a weapon, I’d have to imagine “holding” vs “wielding” can make quite a difference in the character’s stance and demeanor based on “wielding”’s use cases.

using reserved words, you can get the best of both worlds. **I would also argue that using artist names provides a similar benefit, although generally does not as much specify and object or element.**

**Prompting in other languages**

While not fully intended to, a sizable amount of the pictures in the dataset made it through with captions pairs in another language. Not enough that you could write an entire prompt in russian and expect it to do well, but especially with languages that use the latin alphabet and especially with popular words from other languages that most people know, you can make use of them. I’ll put money that Sol (spanish for sun) or Familia (you can guess that one) will give elements related to their meaning.

However, like I said with words being evaluated not by their definition but what they have come to mean, I imagine that their depiction will be somewhat different. [**Kaliyuga did a study on this](https://peakd.com/@kaliyuga/some-brief-thoughts-text-to-image-ai-art-models-and-the-sapir-whorf-hypothesis)** where she used the word for women in a bunch of different languages and the resulting image was that of someone with the cultural appearance and race of someone who may speak that language. Just something to keep in mind.

Also, for artists who do not seem to be recognized by CLIP, although their actual art style doesn’t show up in the output really, sometimes it seems that their name and the implied nationality of that name shows up in the depiction.

Correct me if I’m wrong, but it seems that there’s some vague asian influences on the architecture despite there not being anything that resembles that in Yanjun Cheng’s artwork.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ecb5972c-0ff0-4085-b653-d261d95426af/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91ab75a6-ca88-4131-8e29-1995007dadc7/Untitled.png)

I’m not here to criticize the biases of neural networks as that’s a whole ethical dilemma for another paper, but it is very interesting as it shows how the AI makes connections in its training and perhaps something to think about when you’re engineering your prompt.

**Finetuned Models/ tuning your own model**

Thanks to the work of [**Sxela](https://www.patreon.com/sxela/posts),** tuning CLIP to make a more customized model is now much easier, and colab compatible. To do this, you will need to collect a whole lot of images, all with a similar theme or trait for the AI to recognize patterns in. When you tune CLIP, you sacrifice a bit of its wide scope of things it can capture to be able to capture a more niche thing much better, especially when our regular model might struggle with it.

[**KaliYuga’s PixelArtDiffusion**](https://colab.research.google.com/github/KaliYugaa/Pixel-Art-Diffusion/blob/main/Pixel_Art_Diffusion_v1_0.ipynb) is a superb example of a good use for it.

She also made a neat article on how to train one yourself! [**https://peakd.com/@kaliyuga/training-your-own-unconditional-diffusion-model-with-minimal-coding**](https://peakd.com/@kaliyuga/training-your-own-unconditional-diffusion-model-with-minimal-coding)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe0d290b-8e6f-484f-9d6a-b433e7a56ea6/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0197542c-c7ff-4e15-ad5c-26b0653eecd8/Untitled.png)

Unfortunately the regular Colab GPUs are unable to tune the 512x512 version, so you’d be tuning the 256x256 version.
This does restrict running at higher resolutions a little bit. For a 512x512 model to be producing a 1024x1024 image, that would only be 4x its size whereas for a 256x256 model, that would be 16x it’s size, and the memory requirement for that does build up.

In my personal opinion, regular ol’ CLIP is able to capture so much so well with effective prompting, so I generally prefer to go that route, but there are definitely some unique cases people have come up with that have been really interesting.

## **The Coherency vs Detail Dilemma**

We love rich detail, but we also love when we look at a person or object in an image and it does not look totally deformed. There are some settings that offer better detail and then others that offer better coherency on average, but there does seem to be some sort of tradeoff. I am trying to figure out optimal schedules for more variables to see if that can let us get the best of both worlds, by having a certain value for early on in the run when defining structures, and another value that may help it with finer details.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c381e1e3-2b48-406d-b8d5-39aac7120578/Untitled.png)

Here’s something that’s pretty nicely coherent, but pretty smooth textures (even after quite a bit of photoshop workup) and a pretty lackluster background.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a98b412-e003-4adb-b1e6-a4c03f9e5fde/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/935440c9-7775-4c42-b257-22065dad283a/Untitled.png)

Here’s our opposite side of the spectrum, ultra rich detail and some artistic brush strokes, but also a lot of random stuff all over the place and spot where theres almost “infinite detail” but maybe not in a way that makes sense.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d4283a48-9aa4-481d-a544-647e95019058/Untitled.png)

I think this might be the best possible example to date I have of something thats all the way on the detail side of the spectrum without too much coherence. I can make out textures of things i recognize: lightning, neon city lights in what appears to an anime setting. Stuff is going in and out blur and textures are disconnected and disorienting

It’s almost as if you could make a brush, a texture brush of sorts in photoshop, that just paints on textures of a certain thing, and just went buck wild all over the place. It reminds me of Nvidia's landscape AI program where you could paint a whole section of an image and it would fill it in with textures from that specific material

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4381bbf4-2943-47fc-a704-029a1a83ed19/Untitled.png)

It’s incredibly rich in detail, and I think this is one of the nifty things of clip-guided diffusion that other forms of AI text-to-image really can't do, but to that end, I don’t know what I am looking at…

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ade6025-67be-457c-a4a0-0cda3ec7a580/Untitled.png)

Here’s another example that I did. It seems like there’s certain spots in the image it just said, alright let’s just fill this spot with lots of intricate machinery, and it fools the eye as we look at a mass of wires and don’t really bother to trace where each one is going anyway.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d56c1d21-e806-4e91-807d-1308afa1e0a5/Untitled.png)

Here, the fine detail on the bookshelves is superb and appears as if a lot of attention was given to these spots, but also its sort of just masses of detail where the bookshelves themselves are distorted and at impossible angles. These examples are not super, as I generally keep some of my settings values on the lower end of the range, and halt the runs that are coming out deformed.

A lot of the balancing act for this lies in the cuts system as well as your clip_guidance_scale. As I stated in the section on Cut_ic_pow, that plays a very heavy role in the detail vs coherence aspect. Also the amount of your innercuts and when they occur can greatly influence detail.

Many innercuts paired with high cut pow, especially early on and sustained throughout, primes your image for strong crisp detail over coherent structure. Not saying that its not possible to get a good structure while running this, but it's definitely less likely. See KyrickYoungs studies on this

[**Adjusting innercuts along with cut_ic_pow**](https://twitter.com/KyrickYoung/status/1502119135446245386)

Clip_guidance_scale is another mediator. High values can bring quite a bit out, but can also overdo things, and give that classic deepfried look at very high values.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/310cb2ce-1a12-4475-873b-33d50cecfbc3/Untitled.png)

Here’s an example by annetropy at just 5k clip_guidance_scale.
This is on a colab GPU, meaning far from any kind of maxed out magic settings. Super impressive stuff.

I’ll leave you with this graphic I put together that should sum it all up.

![reference.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d9782e4c-471a-4b31-862d-a84c78206f32/reference.png)

## **OpenCLIP Models, LAION ViT32 and friends**

OpenCLIP is an open-source project that aims to make CLIP-like networks that can be used to guide generation. They use the same exact models, but are trained on different datasets, namely LAION’s 2B, 2 billion image dataset.

I haven’t gotten around to these as I am using an outdated notebook still, but have heard some mixed reviews, but still haven’t seen a 1:1 comparisson done with it. Here’s all of what’s in disco so far. If you thought the default ViT and RN models were gibberish to read, try this on for size.

![Screen Shot 2022-07-18 at 3.03.18 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3dfa11c6-e3fa-4080-8715-5ebc2a72c965/Screen_Shot_2022-07-18_at_3.03.18_AM.png)

With that said, I haven’t tried any of these and very minimally looked into it. 

I’ve heard there were some issues where using one of the ViT32 editions could increase runtimes by 1000% and then I hear others who swear by it. It’s all probably a bit difficult to tell when using other default CLIP models in the mix, but I’d be interested to see what comes out of it.

to break down the names a little bit, you’ll see they all do start with the same prefix as our regular ones.

RN or ViT along with their number.

the next part seems to reference which dataset it is trained on: LAION2b (2 billion image edition), LAION400m (400 million image edition), and then the cc12m and cc15m models.

I am not sure what quickgelu is though, and the quick google search I did was a bit dizzying.

I haven’t tried these so I really can’t speak on them, but I have used text-to-image programs that do rely on LAION400m’s dataset for generations and It’s been unimpressive. But admittedly that was a while ago, and I know its creators have been working a lot to improve it.

One of the issues it had with it then is it was pretty limited in the scope of prompts it could capture. It was pretty strong with realism and maybe even better with text than DALLE2, but more ambitious prompts, mashing up artist styles, etc. all caused flops. 

One of the most notable things is the famous “trending on artstation” would cause it to generate images with the words “trending on artstation” printer on random things.

I may be incorrect, but I believe the data collection for training was a raw unfilitered scrape of the web, so many “non-images” ended up in the dataset. Non-images meaning all sorts of web elements that may not be intended to be in a image generation dataset.

If we were to do a full scrape of everything on this page, we would get the thumbnails of the videos, good!

but we’d also end up with things like this.

![Screen Shot 2022-07-18 at 3.15.14 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83444def-9ca9-4f79-9e8a-797006e0f0a3/Screen_Shot_2022-07-18_at_3.15.14_AM.png)

I may not be completely correct; they may have had something to prevent this, but from the looks of the outputs, it was clear that a lot of things that didn’t need to be in the dataset made it’s way in and interfered with the image-caption pairs we would desire.

if you’ve used the CLIP retrieval tool, which searches CLIP embeddings, indexed by LAION images, you’ve probably gotten some strange things come up when deviating from just searching realistic images.

here’s 8k resolution with aesethetic score of 9 and aesthetic weight of 0.9

![Screen Shot 2022-07-18 at 3.24.37 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/89a5297c-2792-4b10-bc1e-f9b04ac7ede5/Screen_Shot_2022-07-18_at_3.24.37_AM.png)

I do not know why, but dollhouses and dolls are the most abundant thing you find on here, its almost unavoidable.

and here it is at aesthetic score 9, aesthetic weight 0.5

![Screen Shot 2022-07-18 at 3.27.47 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da68bc08-6d55-40d9-af7d-22213b214bf0/Screen_Shot_2022-07-18_at_3.27.47_AM.png)

better, but also a lot of product labels and advertisement text.

I tried a few more combinations to see if i could pull some better results. score 5, weight 0.5

![Screen Shot 2022-07-18 at 3.29.06 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b9eaa702-9041-4d18-a2a9-fa157cb3172b/Screen_Shot_2022-07-18_at_3.29.06_AM.png)

score 9, weight 0.2

![Screen Shot 2022-07-18 at 3.29.55 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d97b32a7-7028-4802-92e6-d2d04e78bd0a/Screen_Shot_2022-07-18_at_3.29.55_AM.png)

this isn’t the end-all-be-all and I should probably try playing with the aesthetic score on some other searches, but I think this does support my case, and the abundant text seen here translates directly into the outputs.

With the training of CLIP there was a good deal of curating and filtering to ensure this doesn’t happen, and I believe now LAION’s team is following suit and has definitely stepped up their game with their work on Simulacra and such. 

But for now, I’m quite cozy with the regular CLIP models in Disco until I see a comparison on them.

*Update 7/21/22: ran 1 comparisson using CLIP’s ViT32b ViT16b and RN50*

*against OpenCLIP counterparts. The results were quite underwhelming.*

![TimeToDisco194_0.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4ffef28c-59de-47ac-8deb-e025e706869a/TimeToDisco194_0.png)

![FYJsRBxXEAI-64R.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/635e4276-9134-43ef-9514-a2e0adbc0a65/FYJsRBxXEAI-64R.jpeg)

## **Understanding The Diffusion Curve**

Steps here work a bit different than what you might be used to if you’ve played with GANs. GANs are neat in that you can take a run, do 100 steps on it, pack it away for a bit, do 100 more steps on it. There’s not set end point, you can just run iterations on it indefinitely

Diffusion models, however, have a path they follow.

It’s best to think of it proportionally rather than exact steps.

250 steps in on a 500 step run would look most similar in terms of progress to 125 steps on a 250 steps run.

The image at a given % mark, whether on 200 steps, 500 steps, or any amount of steps, should look similar in terms of how much noise is still left.

Very frequently I hear people aren’t super satisfied with the 250 steps so they might try to raise it a bit. Bumping it up to say, 260 steps is a bit problematic. At 250, you’re fitting perfectly in the diffusion curve, doing 4 Dsteps per step to reach that 1000 end point.

At 260, you’re unable to do 4 Dsteps per step as that would exceed the 1000 mark. So it would be rounded down to do 3 Dsteps per step. So now 3 x 260 = 780. We would get ourselves 220 Dsteps shy of our desired endpoint, missing out on 220/1000 or the last 22% of the run.

**A run with 251 steps would be more similar to a run with 333 steps than it would to a 250 step run. This is because both will use 3 Dsteps/step. It’s just that the 251 step run will only be able to achieve 251 x 3Dsteps/step = 753, leaving you at 75.3% progress of the**  **run, the last 24.7% remaining unfinished.**

**This chart I made shows each range of steps where a certain # of diffusion steps occurs, optimally you would want to choose the number of steps at the right edge of the range, marked by the dot.**

**[(Value at the right end of a range) - (chosen # of steps in that range)] * (#of Dsteps/step in that range) =  the amount of Dsteps lost.**

**I.e 400 steps, so in the 2 dstep/step range. [(500)-(400)]*2 = 200 steps lost, 20% of run**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e0653037-173d-4f87-a6d1-cfb2c91fc5bc/Untitled.png)

**Here’s a better way to think of it through some graphs**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eded290d-f1ae-403c-80d1-7a8f58019ea8/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd4a1861-c6d0-41ed-a8e5-29dafe1675c7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f569ae9a-cf0c-4dd6-a9e2-96b4ccf1ee84/Untitled.png)

## DALLE, Midjourney, Latent Diffusion, LAION and others.

to start this all, it’s important to know the difference between the two most popular architecture for text-to-image AI programs. **Latent Diffusion** and **Clip-guided Diffusion**

*this section is under construction, I am still researching so it is possible some sections may have inaccuracies*

**CLIP-guided Diffusion (this is what disco uses)**

- uses two AI modules
    - a diffusion model which creates an image from noise, ours is trained on Imagnet
    - CLIP models/networks which evaluate your prompt on every step and cutout, and generate a score to guide our diffusion model in the right direction of production.
- Because of how many times the image is evaluated against our prompt, it can take quite a while. On default settings, 4 cut batches, 16 cutn, 250 steps, we’d be looking at 4x16x250 = 16,000 evaluations, and I’m pretty certain that’s per CLIP model used.
- subjectively: more artistic and dynamic
- able to handle things like artist combos or multiple styles, whereas most latent diffusion models i have seen can possibly juggle two styles at a time, but will otherwise end up picking one and ignoring the others.
- flaws/ai mistakes look like this:

![Screen Shot 2022-07-18 at 3.47.18 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4458a8a8-fb26-400c-8356-fb37fa3b9d54/Screen_Shot_2022-07-18_at_3.47.18_AM.png)

hair under the chin, double nose going on, another eye starting on the side of the face.

**Latent Diffusion**

- Run much much faster than clip-guided diffusion, and usually can generate several images at the same time.
- are often restricted in aspect-ratio and/or resolution
- potential for very accurate results, outputs look much like real-life images.
- flaws/ai mistakes tend to look like this:

![Screen Shot 2022-07-18 at 3.56.45 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/926ef990-e0bf-4c2e-a4f0-8b5bc5ac2c2f/Screen_Shot_2022-07-18_at_3.56.45_AM.png)

doesn’t suffer from repetition really when clip-guidance and cuts are out of the picture, but there’s some areas where the pixels just look like they got botched or smeared. I’m really not sure how else to put it. aside from the splotches on the eye and a few others, this one is pretty convincing and neat.

Here’s another comparison.

![Screen Shot 2022-07-18 at 3.59.40 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a0e4a9f-2667-4e67-8789-08409c7ffa81/Screen_Shot_2022-07-18_at_3.59.40_AM.png)

some messy stuff going on all over the place and some repetition in the cigarettes etc.

![Screen Shot 2022-07-18 at 3.58.50 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18316f2a-49db-498e-b4d7-ef7652db88e9/Screen_Shot_2022-07-18_at_3.58.50_AM.png)

same prompt, totally missed the point thought :(. 

one more try

![Screen Shot 2022-07-18 at 4.04.34 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c51b119b-b7bb-4345-a2c0-59c5d3187f89/Screen_Shot_2022-07-18_at_4.04.34_AM.png)

seems to have a little bit of the artstyle! but also didn’t seem to pay much attention to cigarette, portrait, or adhering to the artstation style.

However, it is quite impressive at photorealistic outputs:

![Screen Shot 2022-07-24 at 6.44.45 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dda9c116-571f-465c-acfe-0863bfa7b640/Screen_Shot_2022-07-24_at_6.44.45_PM.png)

each really has their own strengths, 

there are things that latent diffusion models can capture so much more accurately than what clip-guided diffusion models can and vice versa.

I personally like CLIP-guided diffusion better, simply because they generally cannot pass as human-made images, and I like that it is its own class of images rather than trying to blend in with real ones.

In short, CLIP-guided diffusion yields a really aesthetic kind of uncanny valley, to me.

*Update 7/26/22: Came back to say Stability AI has really stepped up their game, and appears quite competitive with DALLE. Really an incredible technological achievement.*

![Screen Shot 2022-07-26 at 3.46.50 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74549a11-7908-49e8-9ecc-dc1b1093739d/Screen_Shot_2022-07-26_at_3.46.50_PM.png)

### Midjourney

Midjourney is incredibly popular tool now. It’s not open source, but neither is the program authored by a big corporation think tank. It’s an interesting middle ground, and they’ve created a pretty neat product.

A question I hear a lot though is, “How can we get Discodiffusion more like Midjourney?” Pretending the code isn’t private for a second, there is probably quite a lot we could learn from their image generation process, but also they have trained their own model as well as developed so many other changes that we’d have to pretty much rewrite Disco entirely.

I am not sure how Midjourney works, but I do know they take advantage of the strategy of running at a lower resolution to then upscale through a diffusion model afterwards to add detail. 

the noise/progress images also look very very different from Disco’s 

MJ progress images look like this

![Screen Shot 2022-07-18 at 4.20.18 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5dad1e16-a0d1-4cd3-8daa-6dc70c94ef4b/Screen_Shot_2022-07-18_at_4.20.18_AM.png)

sort of like a smear of color rather than the usual speckled noise we see with disco.

![Screen Shot 2022-07-18 at 4.21.04 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48ccb128-23cd-4d3b-b24d-f078738a0154/Screen_Shot_2022-07-18_at_4.21.04_AM.png)

here’s a final result after someone decided to upscale one of my renders

![Screen Shot 2022-07-18 at 4.24.13 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5310aece-88f0-4faa-a090-56527fd7f816/Screen_Shot_2022-07-18_at_4.24.13_AM.png)

the final results changed their color scheme entirely. also worth noting a prompt like “the greatest thing to ever exist” will actually get you some neat things, 

this simply wont happen on programs like Disco or JAX diffusion.

![Screen_Shot_2022-07-18_at_7.18.48_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9ee6d780-6991-4e7d-8133-66c1e316b348/Screen_Shot_2022-07-18_at_7.18.48_PM.png)

Here was Disco’s attempt, charming in its own way. 

but what i generally find with disco and programs of the like is that if its not in the prompt, it won’t be there. Meanwhile, DALLE2 can get this diverse range of coherent images from just “fantasy.” 

see: https://www.instagram.com/p/CdbFCnTl74p/?hl=en

![Screen Shot 2022-07-18 at 7.48.09 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/99d916b8-0e33-4dce-b693-b53ed14f6de8/Screen_Shot_2022-07-18_at_7.48.09_PM.png)

![Screen Shot 2022-07-18 at 7.47.58 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/41d933dd-ba54-4708-9829-a9d2517afc52/Screen_Shot_2022-07-18_at_7.47.58_PM.png)

![Screen Shot 2022-07-18 at 7.48.03 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6c4efe1-8b20-48f2-b876-969bbde3590d/Screen_Shot_2022-07-18_at_7.48.03_PM.png)

I’m not sure if it’s a matter of model training, fine-tuning, or that there’s some “autotune” features that can add things to your prompt behind the scenes etc.

the one thing i can say for sure, is that Midjourney has a tendency to “activate symmetry” on certain prompts where it may be relevant. It’s capable of non-symmetrical outputs, but things like portraits or faces may suddenly have really strong adherence to symmetry.

![Screen Shot 2022-07-18 at 4.29.23 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88fc11ee-6a39-41fc-ba36-a510ce080b5c/Screen_Shot_2022-07-18_at_4.29.23_AM.png)

![Screen Shot 2022-07-18 at 4.27.27 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e20a3a3-fedf-4d53-b5ad-57b303296d4c/Screen_Shot_2022-07-18_at_4.27.27_AM.png)

**Glide**

**Cc12m**

**ruDalle**

**Dalle-mini**

**Midjourney**

**Laion, compviz**

## FAQ

## **Thoughts**

*Is all of this art?*

**Yes, I like looking at it**

*Am I or the machine the artist?*

**This is a question that has been frequently up for debate in this commmunity. With many insiders defending their work and outsiders that are too quick to shrug it off as “cheating”. Although I can empathize with those who have put in a lot of effort to art by hand and the feeling that their livelihood may be devalued by our developments. In all my exploration and discussing with others about this topic, I really don’t have a solid answer to this question, largely because art will always be subjective to the viewer.**

**At the very least, with the program I use, I’m happy to call it a craft. There is an endless mission to test and improve and explore.  I may not be the artist for all my pieces, but I am at the very least a heavily involved creative director.**

From the Pixray prompt library

![Screen Shot 2022-06-03 at 8.11.36 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d490fa9-d4ae-4531-89af-fcd9d1c4aeba/Screen_Shot_2022-06-03_at_8.11.36_PM.png)

## In the words of Anthony Fantano, “Y’all know this is just my opinion, right?”