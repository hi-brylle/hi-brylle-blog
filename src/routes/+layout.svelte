<div>
    <nav>
        <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
        </ul>
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    nav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: aqua;
        width: 25%;
        overflow-y: auto;
        display: block;
    }

    main {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 75%;
        display: block;
        background-color: aquamarine;
        overflow-y: auto;
    }
</style>